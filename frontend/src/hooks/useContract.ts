import { useCallback } from "react";
import {
  client,
  getBrowserWallet,
  buildEntryFunctionPayload,
  MODULE_ADDRESS,
  MODULE_NAME,
} from "@/lib/aptos";
import type { Types } from "aptos";

// Utility to safely extract fields from Aptos Move resource formats
function extractField(obj: any, key: string) {
  if (!obj) return undefined;

  if (obj[key] !== undefined) return obj[key];
  if (obj.data?.[key] !== undefined) return obj.data[key];
  if (obj.data?.fields?.[key] !== undefined) return obj.data.fields[key];
  if (obj.fields?.[key] !== undefined) return obj.fields[key];

  return undefined;
}

export function useContract() {
  // READ: get next parcel id
  const getNextId = useCallback(async (): Promise<number> => {
    try {
      const resourceType = `${MODULE_ADDRESS}::${MODULE_NAME}::Registry`;
      const res = await client.getAccountResource(MODULE_ADDRESS, resourceType);

      const next =
        extractField(res, "next_parcel_id") ??
        extractField(res.data, "next_parcel_id") ??
        undefined;

      if (next === undefined)
        throw new Error("next_parcel_id not found in Registry resource");

      return Number(next);
    } catch (e) {
      throw new Error(`getNextId failed: ${(e as Error).message}`);
    }
  }, []);

  // READ: get parcel by ID
  const getParcel = useCallback(async (parcelId: number) => {
    try {
      // Try view function
      const payload = {
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_parcel`,
        type_args: [],
        args: [String(parcelId)],
      };

      const resp = await fetch(`${(client as any).nodeUrl}/views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        const json = await resp.json();
        return json;
      }

      // Fallback: registry + table lookup
      const registryType = `${MODULE_ADDRESS}::${MODULE_NAME}::Registry`;
      const reg = await client.getAccountResource(MODULE_ADDRESS, registryType);

      const parcelsTable =
        extractField(reg, "parcels")?.handle ??
        extractField(reg.data, "parcels")?.handle ??
        extractField(reg.fields, "parcels")?.handle;

      if (!parcelsTable) throw new Error("parcels table handle not found");

      const item = await client.getTableItem(
        parcelsTable,
        "u64",
        `${MODULE_ADDRESS}::${MODULE_NAME}::LandParcel`,
        String(parcelId)
      );

      return item;
    } catch (e) {
      throw new Error(`getParcel failed: ${(e as Error).message}`);
    }
  }, []);

  // Helper to sign & submit
  const submitTxWithWallet = useCallback(
    async (payload: Types.TransactionPayload) => {
      const wallet = getBrowserWallet();
      if (!wallet || !wallet.signAndSubmitTransaction) {
        throw new Error(
          "No Aptos wallet detected. Connect Petra/Martian/Pontem."
        );
      }
      try {
        if (wallet.connect) await wallet.connect();
      } catch {}
      return wallet.signAndSubmitTransaction!(payload);
    },
    []
  );

  // WRITE: Submit new parcel
  const submit = useCallback(
    async (params: {
      khasra_number: string;
      document_cid: string;
      area_sqm: number;
      notes: string;
      village: string;
      tehsil: string;
      district: string;
    }) => {
      const payload = buildEntryFunctionPayload(
        MODULE_ADDRESS,
        MODULE_NAME,
        "submit_land",
        [],
        [
          params.khasra_number,
          params.document_cid,
          String(params.area_sqm),
          params.notes,
          params.village,
          params.tehsil,
          params.district,
        ]
      );
      return submitTxWithWallet(payload);
    },
    [submitTxWithWallet]
  );

  // WRITE: Approve parcel
  const approve = useCallback(
    async (parcelId: number) => {
      const payload = buildEntryFunctionPayload(
        MODULE_ADDRESS,
        MODULE_NAME,
        "approve",
        [],
        [String(parcelId)]
      );
      return submitTxWithWallet(payload);
    },
    [submitTxWithWallet]
  );

  const reject = useCallback(
    async (parcelId: number) => {
      const payload = buildEntryFunctionPayload(
        MODULE_ADDRESS,
        MODULE_NAME,
        "reject",
        [],
        [String(parcelId)]
      );
      return submitTxWithWallet(payload);
    },
    [submitTxWithWallet]
  );

  const dispute = useCallback(
    async (parcelId: number) => {
      const payload = buildEntryFunctionPayload(
        MODULE_ADDRESS,
        MODULE_NAME,
        "dispute",
        [],
        [String(parcelId)]
      );
      return submitTxWithWallet(payload);
    },
    [submitTxWithWallet]
  );

  const transfer = useCallback(
    async (parcelId: number, newOwnerAddress: string) => {
      const payload = buildEntryFunctionPayload(
        MODULE_ADDRESS,
        MODULE_NAME,
        "transfer_ownership",
        [],
        [String(parcelId), newOwnerAddress]
      );
      return submitTxWithWallet(payload);
    },
    [submitTxWithWallet]
  );

  return {
    submit,
    approve,
    reject,
    dispute,
    transfer,
    getParcel,
    getNextId,
  };
}

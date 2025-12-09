// src/pages/ParcelDetailPage.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/StatusBadge";
import { useParcel } from "@/contexts/ParcelContext";
import { useToast } from "@/hooks/use-toast";
import { useContract } from "@/hooks/useContract";

const ParcelDetailPage: React.FC = () => {
  const { id } = useParams();
  const pid = Number(id);
  const { getParcelById, disputeParcel, updateParcel } = useParcel();
  const parcel = getParcelById(pid);
  const { toast } = useToast();
  const { getParcel: getParcelOnChain } = useContract();

  const handleDispute = () => {
    if (!parcel) return;
    disputeParcel(parcel.id);
    toast({
      title: "Dispute raised",
      description: `Parcel #${parcel.id} marked disputed locally`,
    });
  };

  const syncFromChain = async () => {
    if (!parcel) return;
    toast({ title: "Syncing", description: "Fetching on-chain data..." });
    try {
      const onChain = await getParcelOnChain(parcel.id);
      const data = onChain?.data ?? onChain;

      const n = Number(data?.status ?? data?.status_enum);

      let newStatus =
        n === 1 ? "approved" : n === 2 ? "rejected" : n === 3 ? "disputed" : "pending";

      updateParcel(parcel.id, { status: newStatus });
      toast({ title: "Synced", description: `Status updated to ${newStatus}` });
    } catch (err) {
      toast({
        title: "Sync failed",
        description: "Could not sync from chain",
        variant: "destructive",
      });
    }
  };

  if (!parcel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Parcel Not Found</h2>
          <Link to="/results">
            <Button>Back</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const ipfsUrl = parcel.documentCID?.startsWith("http")
    ? parcel.documentCID
    : `https://ipfs.io/ipfs/${parcel.documentCID}`;

  const tehsildar = { name: "Not Assigned" };

  return (
    <div className="min-h-screen tribal-pattern px-4 py-8">
      <Link to="/results">
        <Button variant="outline" className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          PARCEL #{parcel.id} — {parcel.khasraNumber}
        </h1>
        <div className="flex items-center gap-3">
          <StatusBadge status={parcel.status} />
          {parcel.status === "approved" && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Blockchain Verified
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* OWNER */}
          <Card>
            <CardHeader>
              <CardTitle>👤 Owner Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><b>Name:</b> {parcel.ownerName}</p>
              <p><b>Wallet:</b> {parcel.ownerWallet}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline">View Owner Parcels</Button>
                <Button size="sm" onClick={syncFromChain}>🔁 Sync</Button>
              </div>
            </CardContent>
          </Card>

          {/* LOCATION ✅ FIXED */}
          <Card>
            <CardHeader>
              <CardTitle>📍 Location Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <p>Village: {parcel.village}</p>
                <p>Tehsil: {parcel.tehsil}</p>
                <p>District: {parcel.district}</p>
                <p>Khasra: {parcel.khasraNumber}</p>
              </div>

              <Separator />

              <p className="font-bold">Area: {parcel.area} sqm</p>
              {parcel.notes && <p>Notes: {parcel.notes}</p>}

              {/* ✅ MAP EMBED */}
              {parcel.mapLink && (
                <div className="space-y-2 mt-3">
                  <a href={parcel.mapLink} target="_blank">
                    <Button className="w-full">🌍 Open Map</Button>
                  </a>
                  <div className="h-72 border rounded overflow-hidden">
                    <iframe
                      src={parcel.mapLink}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ✅ DOCUMENT */}
          {parcel.documentCID && (
            <Card>
              <CardHeader>
                <CardTitle>📄 Document</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="break-all text-sm">{parcel.documentCID}</p>

                <div className="flex gap-2 mt-2">
                  <a href={ipfsUrl} target="_blank">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4" /> View
                    </Button>
                  </a>
                  <a href={ipfsUrl} download>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" /> Download
                    </Button>
                  </a>
                </div>

                <div className="mt-3 border rounded">
                  {ipfsUrl.endsWith(".pdf") ? (
                    <iframe src={ipfsUrl} className="w-full h-80" />
                  ) : (
                    <img src={ipfsUrl} className="w-full max-h-80 object-contain" />
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* TEHSILDAR */}
          <Card>
            <CardHeader>
              <CardTitle>📌 Revenue Officer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tehsildar.name}</p>
              <Separator />
              <div className="space-y-2 mt-2">
                <Button className="w-full"><Phone className="w-4 h-4" /> Call</Button>
                <Button className="w-full" variant="secondary"><MessageCircle className="w-4 h-4" /> WhatsApp</Button>
                <Button className="w-full" variant="outline"><Mail className="w-4 h-4" /> Email</Button>
              </div>
            </CardContent>
          </Card>

          {/* ACTIONS */}
          <Card>
            <CardHeader>
              <CardTitle>⚡ Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {parcel.status === "approved" && (
                <>
                  <Button className="w-full">➡️ Transfer</Button>
                  <Button variant="secondary" className="w-full">📑 Print Certificate</Button>
                </>
              )}

              <Button variant="destructive" onClick={handleDispute} className="w-full">
                ⚖️ Raise Dispute
              </Button>

              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ParcelDetailPage;

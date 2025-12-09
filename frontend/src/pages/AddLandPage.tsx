// src/pages/AddLandPage.tsx
import { rajasthanDistricts } from "@/data/rajasthanDistricts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useParcel } from "@/contexts/ParcelContext";
import { useContract } from "@/hooks/useContract";

/* ✅ RAJASTHAN DISTRICTS + TEHSILS (DEMO DATA) */
const RAJASTHAN_DATA: Record<string, string[]> = {
  Jaipur: ["Jaipur", "Chomu", "Phulera"],
  Jodhpur: ["Jodhpur", "Osian", "Bilara"],
  Udaipur: ["Udaipur", "Girwa", "Mavli"],
  Kota: ["Kota", "Digod", "Pipalda"],
  Ajmer: ["Ajmer", "Kishangarh", "Beawar"],
  Alwar: ["Alwar", "Tijara", "Rajgarh"],
  Bikaner: ["Bikaner", "Kolayat", "Nokha"],
  Bhilwara: ["Bhilwara", "Mandal", "Shahpura"],
};

const AddLandPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addParcel } = useParcel();
  const { submit: submitOnChain } = useContract();

  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    district: "",
    tehsil: "",
    village: "",
    khasraNumber: "",
    area: "",
    notes: "",
    documentCID: "",
    mapLink: "",
  });

  const handleNext = () => setStep((s) => Math.min(5, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  /* ✅ DOCUMENT PREVIEW */
  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast({
      title: "File ready",
      description: "Preview generated. You can simulate IPFS upload.",
    });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.khasraNumber || !formData.district) {
      toast({
        title: "Missing fields",
        description: "Please fill required fields.",
      });
      return;
    }

    // ✅ Always add locally
    const newParcelId = addParcel({
      khasraNumber: formData.khasraNumber,
      ownerName: formData.fullName,
      ownerWallet: "0x",
      district: formData.district,
      tehsil: formData.tehsil,
      village: formData.village,
      area: Number(formData.area) || 0,
      status: "pending",
      documentCID: formData.documentCID,
      notes: formData.notes,
      mapLink: formData.mapLink,
    });

    toast({
      title: "Success",
      description: `Parcel submitted! ID: ${newParcelId}`,
    });

    navigate("/my-lands");
  };

  return (
    <div className="min-h-screen tribal-pattern">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto vintage-border">
          <CardHeader>
            <CardTitle className="text-2xl">➕ Add Your Land</CardTitle>
            <CardDescription>Step {step} of 5</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* ✅ STEP 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <Label>Full Name *</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />

                <Button onClick={handleNext} className="w-full">
                  Next →
                </Button>
              </div>
            )}

            {/* ✅ STEP 2 — RAJASTHAN DISTRICT + TEHSIL */}
           {/* ---------- STEP 2 ---------- */}
{step === 2 && (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Land Location</h3>

    {/* ✅ DISTRICT DROPDOWN */}
    <div>
      <Label>District *</Label>
      <Select
        value={formData.district}
        onValueChange={(value) =>
          setFormData({
            ...formData,
            district: value,
            tehsil: "", // reset tehsil when district changes
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select District" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(rajasthanDistricts).map((district) => (
            <SelectItem key={district} value={district}>
              {district}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* ✅ TEHSIL DEPENDENT DROPDOWN */}
    <div>
      <Label>Tehsil *</Label>
      <Select
        value={formData.tehsil}
        onValueChange={(value) =>
          setFormData({ ...formData, tehsil: value })
        }
        disabled={!formData.district}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Tehsil" />
        </SelectTrigger>
        <SelectContent>
          {formData.district &&
            rajasthanDistricts[formData.district]?.map((tehsil) => (
              <SelectItem key={tehsil} value={tehsil}>
                {tehsil}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>

    {/* ✅ VILLAGE */}
    <div>
      <Label>Village *</Label>
      <Input
        value={formData.village}
        onChange={(e) =>
          setFormData({ ...formData, village: e.target.value })
        }
        placeholder="Enter village"
      />
    </div>

    <div className="flex gap-2">
      <Button onClick={handleBack} variant="outline" className="flex-1">
        ← BACK
      </Button>
      <Button onClick={handleNext} className="flex-1">
        NEXT →
      </Button>
    </div>
  </div>
)}

            {/* ✅ STEP 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <Label>Khasra Number *</Label>
                <Input
                  value={formData.khasraNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      khasraNumber: e.target.value,
                    })
                  }
                />

                <Label>Area (sqm)</Label>
                <Input
                  type="number"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                />

                <Button onClick={handleNext} className="w-full">
                  Next →
                </Button>
              </div>
            )}

            {/* ✅ STEP 4 — DOCUMENT UPLOAD + PREVIEW */}
            {step === 4 && (
              <div className="space-y-4">
                <Label>Upload Document</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    handleFileUpload(e.target.files?.[0] || null)
                  }
                />

                {previewUrl && (
                  <div className="border rounded p-2">
                    <p className="text-sm mb-2">Preview:</p>
                    {previewUrl.endsWith(".pdf") ? (
                      <iframe src={previewUrl} className="w-full h-48" />
                    ) : (
                      <img
                        src={previewUrl}
                        alt="Document Preview"
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </div>
                )}

                <Label>IPFS CID (Optional)</Label>
                <Input
                  value={formData.documentCID}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      documentCID: e.target.value,
                    })
                  }
                  placeholder="Qm..."
                />

                <Button onClick={handleNext} className="w-full">
                  Next →
                </Button>
              </div>
            )}

            {/* ✅ STEP 5 */}
            {step === 5 && (
              <div className="space-y-4">
                <p>
                  <strong>Owner:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Location:</strong> {formData.tehsil},{" "}
                  {formData.district}
                </p>
                <p>
                  <strong>Khasra:</strong> {formData.khasraNumber}
                </p>

                <Button onClick={handleSubmit} className="w-full">
                  ✅ Submit for Approval
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddLandPage;

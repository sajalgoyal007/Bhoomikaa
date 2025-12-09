# 🌾 **Bhoomika — Blockchain-Based Land Verification System**

*A secure, transparent & tamper-proof digital solution for land ownership verification in India.*

---

## 📌 **Project Overview**

**Bhoomika** ek **blockchain-powered land registry & verification platform** hai jo India me hone wale land disputes, fake documents aur illegal transfers jaise problems ko solve karta hai.

Traditional land systems me:

* Records easily manipulate ho jaate hain
* Approvals traceable nahi hote
* Ownership disputes ka solution opaque hota hai

⚡ **Bhoomika in sab problems ko blockchain ke through permanently solve karta hai.**

## 🧠 **Problem Statement**

India me sabse zyada legal disputes **land ownership** ko lekar hote hain —
chahe wo:

* Ancestral land ho
* Family disputes ho
* Fake registry cases ho

Ek baar galat record register ho jaaye to:

* Use reverse karna mushkil hota hai
* Verification transparent nahi hoti
* Single bad actor poora system manipulate kar sakta hai

✅ **Bhoomika is sabko permanently fix karta hai — using blockchain.**

---

## 🏗 **How Bhoomika Works**

### 🧍‍♂️ Citizen Flow (User Side)

1. User login karta hai
2. Land details add karta hai:

   * District
   * Tehsil
   * Village
   * Area
   * Khasra Number
3. Documents upload karta hai (PDF / Image / IPFS CID)
4. Land blockchain par submit hoti hai
5. Status **Pending** dikhta hai jab tak council approval na de

---

### 🧑‍💼 Council Flow (Authority Side)

1. Council member login karta hai
2. Pending land requests dekhta hai
3. Land ko:

   * ✅ Approve
   * ❌ Reject
   * ⚠️ Dispute
4. Decision instantly user ko reflect hota hai
5. Final decision **blockchain par permanently store** hota hai

---

### 🌍 **Map Integration**

Har land record ke saath:

* ✅ **"View on Map"** option hota hai
* OpenStreetMap ke through:

  * Village
  * Tehsil
  * Approximate land location

---

## 🛠 **Technology Stack**

### 🎨 Frontend

* **React (Vite)**
* **TypeScript**
* **ShadCN/UI**
* **Tailwind CSS**

### ⛓ Blockchain / Backend

* **Move Smart Contracts**
* **Aptos Blockchain**
* **Aptos SDK**
* **Petra Wallet Integration**
* ❌ No Traditional Backend
* ✅ **Blockchain = Backend**

### 💾 Storage

* **LocalStorage** (Temporary demo DB)
* **IPFS-based Document CIDs**

---

## 📦 **Key Features**

### ✅ Citizen Features

* Add & manage land records
* Upload documents or IPFS CID
* View approval status in real-time
* Raise disputes
* Map location preview
* Hindi + English language support

---

### 🧑‍💼 Council Features

* Dashboard for:

  * Pending
  * Approved
  * Rejected lands
* Approve / Reject / Dispute actions
* On-chain verification
* Status syncing with blockchain

---

## 🚀 **Why We Chose Aptos**

* ⚡ Ultra-fast transactions (1–2 sec finality)
* 💸 Very low gas fees
* 🔐 Secure **Move language**
* 🔄 Parallel transaction execution
* ✅ Best for governance & public record systems

---

## ⚙️ **System Requirements**

Make sure you have:

* ✅ Node.js 18+
* ✅ Petra Wallet Browser Extension

---

## 📄 **Smart Contract Overview**

Move smart contracts handle:

* `submit_land`
* `approve`
* `reject`
* `dispute`
* `transfer_ownership` *(future scope)*

📁 Contracts stored in:

```
/contracts
```

---

## 📢 **Future Scope**

* GPS-based land verification
* Aadhaar-linked digital signatures
* Multi-council multi-signature approvals
* NFT-based land ownership certificates
* Full on-chain legal dispute workflow

---

## ✅ **Project Status**

* ✅ Fully working frontend
* ✅ Blockchain integration complete
* ✅ Wallet login functional
* ✅ On-chain land submission & approval working
* ✅ Map integration successful

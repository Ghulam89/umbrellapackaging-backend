import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";

export default function ReviewsFeedUpload() {
  const [file, setFile] = useState(null);
  const [publisher, setPublisher] = useState("Umbrella Custom Packaging");
  const [favicon, setFavicon] = useState(`${BaseUrl}/favicon.png`);
  const [aggregator, setAggregator] = useState("Umbrella Reviews");
  const [baseUrl, setBaseUrl] = useState(BaseUrl);
  const [reviewUrlTemplate, setReviewUrlTemplate] = useState(`${BaseUrl}/review_{id}.html`);
  const [xml, setXml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("publisher", publisher);
      fd.append("favicon", favicon);
      fd.append("aggregator", aggregator);
      fd.append("baseUrl", baseUrl);
      fd.append("reviewUrlTemplate", reviewUrlTemplate);
      const res = await axios.post(`${BaseUrl}/reviews-feed/convert`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setXml(typeof res.data === "string" ? res.data : "");
    } catch {
      setXml("");
    } finally {
      setLoading(false);
    }
  };

  const downloadXml = () => {
    if (!xml) return;
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product_reviews.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <div className="sm:max-w-6xl max-w-[95%] mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Product Reviews XML Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded">
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={publisher} onChange={(e)=>setPublisher(e.target.value)} placeholder="Publisher name" className="border p-2 rounded w-full" />
            <input value={favicon} onChange={(e)=>setFavicon(e.target.value)} placeholder="Favicon URL" className="border p-2 rounded w-full" />
            <input value={aggregator} onChange={(e)=>setAggregator(e.target.value)} placeholder="Aggregator name" className="border p-2 rounded w-full" />
            <input value={baseUrl} onChange={(e)=>setBaseUrl(e.target.value)} placeholder="Base URL" className="border p-2 rounded w-full" />
            <input value={reviewUrlTemplate} onChange={(e)=>setReviewUrlTemplate(e.target.value)} placeholder="Review URL template e.g. https://site/review_{id}.html" className="border p-2 rounded w-full md:col-span-2" />
          </div>
          <div className="flex gap-3">
            <Button label={loading ? "Generating..." : "Generate XML"} className="bg-[#4440E6] text-white" />
            <Button label={"Download XML"} className="bg-[#4440E6] text-white" onClick={downloadXml} />
          </div>
        </form>
        <div className="mt-6">
          <textarea value={xml} readOnly rows={16} className="w-full border rounded p-3 font-mono text-sm" />
        </div>
      </div>
    </Container>
  );
}

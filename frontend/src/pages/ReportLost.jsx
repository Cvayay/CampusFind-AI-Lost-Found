const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("type", "lost");
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("contactName", form.contactName);
    formData.append("contactInfo", form.contactInfo);

    if (form.image) {
      formData.append("image", form.image);
    }

    const response = await fetch("http://localhost:4000/api/items", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to submit report.");
    }

    setStatus("Report submitted successfully!");
  } catch (error) {
    setStatus(error.message || "Failed to submit report.");
  }
};
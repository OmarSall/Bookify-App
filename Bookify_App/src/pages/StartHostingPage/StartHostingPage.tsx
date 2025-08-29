import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVenue } from "@/services/venues";
import styles from "./StartHostingPage.module.css";

export default function StartHostingPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerNight: 100,
    capacity: 2,
    street: "",
    city: "",
    country: "PL",
    postalCode: "",
    albumId: 1,
    rating: 4.5,
    featuresInput: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm(previous => ({ ...previous, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const features = form.featuresInput
        .split(",")
        .map(token => token.trim())
        .filter(Boolean);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        pricePerNight: Number(form.pricePerNight || 0),
        capacity: Number(form.capacity || 1),
        street: form.street.trim(),
        city: form.city.trim(),
        country: form.country.trim() || "PL",
        postalCode: form.postalCode.trim() || undefined,
        albumId: Number.isFinite(form.albumId) ? Number(form.albumId) : undefined,
        rating: Number.isFinite(form.rating) ? Number(form.rating) : undefined,
        features,
      };

      const venue = await createVenue(payload);
      navigate(`/venue/${venue.id}`);
    } catch (caught: any) {
      setError(caught?.response?.data?.message ?? "Failed to create venue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.formCard}>
              <h1 className={styles.title}>Start hosting</h1>
              <p className={styles.subTitle}>Add your venue details to list it on Bookify.</p>

              {error && <div className={styles.errorText}>{error}</div>}

              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div>
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>Basic information</div>

                    <label className={styles.label} htmlFor="title">Title</label>
                    <input
                      id="title"
                      className={styles.input}
                      placeholder="Cozy apartment near the park"
                      value={form.title}
                      onChange={(event) => setField("title", event.target.value)}
                      required
                    />

                    <label className={styles.label} htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      className={styles.textarea}
                      placeholder="Describe your place..."
                      value={form.description}
                      onChange={(event) => setField("description", event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>Pricing & capacity</div>
                    <div className={styles.row}>
                      <div>
                        <label className={styles.label} htmlFor="price">Price per night (PLN)</label>
                        <input
                          id="price"
                          className={styles.input}
                          type="number"
                          min={0}
                          step="0.01"
                          value={form.pricePerNight}
                          onChange={(event) => setField("pricePerNight", Number(event.target.value || 0))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="capacity">Capacity</label>
                      <input
                        id="capacity"
                        className={styles.input}
                        type="number"
                        min={1}
                        value={form.capacity}
                        onChange={(event) => setField("capacity", Number(event.target.value || 1))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>Address</div>

                    <label className={styles.label} htmlFor="street">Street</label>
                    <input
                      id="street"
                      className={styles.input}
                      placeholder="Street and number"
                      value={form.street}
                      onChange={(event) => setField("street", event.target.value)}
                      required
                    />

                    <div className={styles.row}>
                      <div>
                        <label className={styles.label} htmlFor="city">City</label>
                        <input
                          id="city"
                          className={styles.input}
                          placeholder="City"
                          value={form.city}
                          onChange={(event) => setField("city", event.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="postalCode">Postal code</label>
                      <input
                        id="postalCode"
                        className={styles.input}
                        placeholder="00-000"
                        value={form.postalCode}
                        onChange={(event) => setField("postalCode", event.target.value)}
                      />
                    </div>
                  </div>

                  <label className={styles.label} htmlFor="country">Country</label>
                  <input
                    id="country"
                    className={styles.input}
                    placeholder="PL"
                    value={form.country}
                    onChange={(event) => setField("country", event.target.value)}
                    maxLength={2}
                  />
                </div>

                <div>
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>Optional</div>
                    <div className={styles.row}>
                      <div>
                        <label className={styles.label} htmlFor="albumId">Album ID (images)</label>
                        <input
                          id="albumId"
                          className={styles.input}
                          type="number"
                          min={1}
                          value={form.albumId}
                          onChange={(event) => setField("albumId", Number(event.target.value || 1))}
                        />
                      </div>
                      <div>
                        <label className={styles.label} htmlFor="rating">Rating</label>
                        <input
                          id="rating"
                          className={styles.input}
                          type="number"
                          min={0}
                          max={5}
                          step="0.1"
                          value={form.rating}
                          onChange={(event) => setField("rating", Number(event.target.value))}
                        />
                      </div>
                    </div>

                    <label className={styles.label} htmlFor="features">Features (comma separated)</label>
                    <input
                      id="features"
                      className={styles.input}
                      placeholder="WiFi, parking, pool"
                      value={form.featuresInput}
                      onChange={(event) => setField("featuresInput", event.target.value)}
                    />
                    <div className={styles.hint}>
                      Separate with commas. They will be created/connected with existing amenity.
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={loading} className={styles.submitBtn}>
                  {loading ? "Creating…" : "Create venue"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

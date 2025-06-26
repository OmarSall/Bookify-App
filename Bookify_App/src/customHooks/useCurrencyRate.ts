import {useEffect, useState} from "react";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const API_URL = `https://api.exchangerate.host/convert?from=EUR&to=PLN&amount=1&access_key=${API_KEY}`;

const useCurrencyRate = () => {
    const [rate, setRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                console.log("💱 API response:", data);

                if (data?.result) {
                    sessionStorage.setItem("EUR_PLN_RATE", data.result.toString());
                    setRate(data.result);
                } else {
                    console.error("❌ API returned error", data?.error || data);
                }
            } catch (e) {
                console.error("❌ Failed to fetch exchange rate:", e);
            } finally {
                setLoading(false);
            }
        };

        void fetchRate();
    }, []);

    return {rate, loading};
};

export default useCurrencyRate;
// ServiceContext.tsx
import React, { createContext, useContext, useState } from "react";

const ServiceContext = createContext<{
  services: Service[];
  loading: boolean;
  error: string | null;
  fetchServices: () => void;
  addService: () => void;
  removeService: (id: string) => void;
  summary: [];
  updateSummary: (data: any[]) => void;
}>({
  services: [],
  loading: false,
  error: null,
  fetchServices: () => {},
  addService: () => {},
  removeService: () => {},
  summary:[],
  updateSummary: () => {}, 
});


export const ServiceProvider: React.FC = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<any[]>([]);

  const updateSummary = (data) => {
    // console.log("updated summary", data);
    setSummary(data);
  };
// console.log("this is Summary", summary);

  // Function to fetch services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3020/services");
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data: Service[] = await response.json();
      setServices(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new service
  const addService = async () => {
    try {
      const response = await fetch("http://localhost:3020/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), 
      });
      if (!response.ok) {
        throw new Error("Failed to add service");
      }
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };


  // Function to remove a service
  const removeService = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3020/services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove service");
      }
      fetchServices();
    } catch (error) {
      console.error("Error removing service:", error);
    }
  };


  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        error,
        fetchServices,
        addService,
        removeService,
        summary,
        updateSummary,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};


export const useServiceContext = () => useContext(ServiceContext);

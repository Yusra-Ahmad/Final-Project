import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Service {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
}

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  fetchServices: () => void;
  addService: () => void;
  removeService: (id: string) => void;
  summary: Service[];
  bookingDetail: Service[];
  setBookingDetail: (data: Service[]) => void;
  updateSummary: (data: Service[]) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<Service[]>([]);
  const [bookingDetail, setBookingDetail] = useState<Service[]>([]);

  const updateSummary = (data: Service[]) => {
    setSummary(data);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_backend_url}services`);
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data: Service[] = await response.json();
      setServices(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addService = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_backend_url}services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error('Failed to add service');
      }
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const removeService = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_backend_url}services/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove service');
      }
      fetchServices();
    } catch (error) {
      console.error('Error removing service:', error);
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
        bookingDetail,
        setBookingDetail,
        updateSummary,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};

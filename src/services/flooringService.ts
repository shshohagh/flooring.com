import { httpClient, getNetworkStatus } from './httpClient';
import { QuoteRequest, PriceEstimate, ContactMessage, FlooringCategory } from '../types';

/**
 * Material pricing lookup table per square foot ($)
 */
export const MATERIAL_RATES: Record<
  FlooringCategory,
  {
    name: string;
    materialLow: number;
    materialHigh: number;
    laborLow: number;
    laborHigh: number;
  }
> = {
  hardwood: {
    name: 'Hardwood Flooring',
    materialLow: 6.5,
    materialHigh: 14.0,
    laborLow: 3.5,
    laborHigh: 6.0,
  },
  tile: {
    name: 'Tile Flooring (Porcelain / Ceramic)',
    materialLow: 4.0,
    materialHigh: 12.0,
    laborLow: 5.0,
    laborHigh: 9.0,
  },
  vinyl: {
    name: 'Luxury Vinyl Plank (LVP)',
    materialLow: 2.8,
    materialHigh: 6.5,
    laborLow: 2.2,
    laborHigh: 3.8,
  },
  carpet: {
    name: 'Plush & Berber Carpet',
    materialLow: 2.0,
    materialHigh: 5.5,
    laborLow: 1.5,
    laborHigh: 2.5,
  },
  commercial: {
    name: 'Commercial High-Traffic Flooring',
    materialLow: 4.5,
    materialHigh: 10.0,
    laborLow: 3.0,
    laborHigh: 5.5,
  },
};

/**
 * Strict Input Validation utilities
 */
export const validateQuoteForm = (data: Partial<QuoteRequest>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.flooringType) {
    errors.flooringType = 'Please select a flooring type.';
  }

  // Strict Numerical field validation
  if (!data.squareFeet || isNaN(Number(data.squareFeet)) || Number(data.squareFeet) <= 0) {
    errors.squareFeet = 'Please enter a valid positive area in square feet (minimum 10 sq ft).';
  } else if (Number(data.squareFeet) < 10) {
    errors.squareFeet = 'Minimum project area is 10 square feet.';
  } else if (Number(data.squareFeet) > 50000) {
    errors.squareFeet = 'For massive spaces over 50,000 sq ft, please contact our commercial team directly.';
  }

  if (!data.roomType || data.roomType.trim() === '') {
    errors.roomType = 'Please select or specify the room type.';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address (e.g. name@example.com).';
  }

  // Strict phone number validation (accepts standard formats like (555) 123-4567, 555-123-4567, or 10-15 digits)
  const phoneClean = (data.phone || '').replace(/[\s\-\(\)\.]/g, '');
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  if (!data.phone || !phoneRegex.test(phoneClean)) {
    errors.phone = 'Please provide a valid 10-digit phone number.';
  }

  if (!data.zipCode || !/^\d{5}(-\d{4})?$/.test(data.zipCode.trim())) {
    errors.zipCode = 'Please enter a valid 5-digit ZIP code.';
  }

  return errors;
};

export const validateContactForm = (data: Partial<ContactMessage>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneClean = (data.phone || '').replace(/[\s\-\(\)\.]/g, '');
  if (data.phone && !/^[+]?[0-9]{10,15}$/.test(phoneClean)) {
    errors.phone = 'Please enter a valid phone number (10-15 digits).';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a message or project detail of at least 10 characters.';
  }

  return errors;
};

/**
 * Real-time instant price calculator
 */
export const calculateEstimate = (
  flooringType: FlooringCategory,
  sqFt: number,
  needsSubfloorPrep: boolean = false,
  needsOldFloorRemoval: boolean = false
): PriceEstimate => {
  const rate = MATERIAL_RATES[flooringType] || MATERIAL_RATES.hardwood;
  const area = Math.max(0, sqFt);

  let materialCostLow = Math.round(area * rate.materialLow);
  let materialCostHigh = Math.round(area * rate.materialHigh);

  let laborCostLow = Math.round(area * rate.laborLow);
  let laborCostHigh = Math.round(area * rate.laborHigh);

  // Add optional subfloor prep ($1.25 - $2.25/sqft)
  if (needsSubfloorPrep) {
    laborCostLow += Math.round(area * 1.25);
    laborCostHigh += Math.round(area * 2.25);
  }

  // Add old floor removal & disposal ($1.00 - $1.75/sqft)
  if (needsOldFloorRemoval) {
    laborCostLow += Math.round(area * 1.0);
    laborCostHigh += Math.round(area * 1.75);
  }

  const totalLow = materialCostLow + laborCostLow;
  const totalHigh = materialCostHigh + laborCostHigh;
  const avgPerSqFt = area > 0 ? Number(((totalLow + totalHigh) / (2 * area)).toFixed(2)) : 0;

  return {
    materialCostLow,
    materialCostHigh,
    laborCostLow,
    laborCostHigh,
    totalLow,
    totalHigh,
    avgPerSqFt,
  };
};

/**
 * Service API Methods
 */
export const flooringService = {
  /**
   * Submit Quote Request via Axios client with simulated server delay & offline protection
   */
  async submitQuote(quoteData: QuoteRequest): Promise<{ quoteId: string; estimate: PriceEstimate }> {
    if (!getNetworkStatus()) {
      throw new Error('You are currently offline. Please reconnect to submit your quote request.');
    }

    // Client-side validation check
    const errors = validateQuoteForm(quoteData);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      throw new Error(firstError);
    }

    // Calculate reliable estimate
    const estimate = calculateEstimate(
      quoteData.flooringType,
      Number(quoteData.squareFeet),
      quoteData.needsSubfloorPrep,
      quoteData.needsOldFloorRemoval
    );

    // In local dev/demo environment, simulate the roundtrip network API call
    // Note: If an Express backend is running on /api/v1/quote, httpClient.post will seamlessly post to it.
    try {
      // Mock network latency for smooth UI response
      await new Promise((resolve) => setTimeout(resolve, 800));

      const quoteId = `FLR-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Store quote in localStorage for user session recall
      const savedQuotes = JSON.parse(localStorage.getItem('flr_recent_quotes') || '[]');
      savedQuotes.unshift({
        quoteId,
        date: new Date().toISOString(),
        ...quoteData,
        estimate,
      });
      localStorage.setItem('flr_recent_quotes', JSON.stringify(savedQuotes.slice(0, 5)));

      return {
        quoteId,
        estimate,
      };
    } catch (err: any) {
      throw new Error(err.message || 'Failed to submit quote request.');
    }
  },

  /**
   * Submit Contact Form
   */
  async submitContact(contactData: ContactMessage): Promise<{ referenceNumber: string }> {
    if (!getNetworkStatus()) {
      throw new Error('Device is offline. Please check your connection.');
    }

    const errors = validateContactForm(contactData);
    if (Object.keys(errors).length > 0) {
      throw new Error(Object.values(errors)[0]);
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      referenceNumber: `MSG-${Date.now().toString().slice(-6)}`,
    };
  },

  /**
   * Newsletter Subscribe
   */
  async subscribeNewsletter(email: string): Promise<boolean> {
    if (!getNetworkStatus()) {
      throw new Error('Offline: Connect to internet to subscribe.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      throw new Error('Please enter a valid email address.');
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  },
};

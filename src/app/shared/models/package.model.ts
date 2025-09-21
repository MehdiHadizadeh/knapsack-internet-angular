export interface OptimizationParams {
    isps: string[];
    durations: string[];
    timeframes: string[];
    budget: number;
}

export interface Package {
    operator: string;
    volume: number;
    price: number;
    duration: number;
    timeframe: string;
}

export interface OptimizationResult {
    totalVolume: number;
    totalPrice: number;
    packages: Package[];
    mostEffective: Package;
}
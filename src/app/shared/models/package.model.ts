export interface ISPConfig {
    isp: string;
    simType: string;
}

export interface OptimizationParams {
    ispConfigs: ISPConfig[];
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
    simType: string;
}

export interface OptimizationResult {
    totalVolume: number;
    totalPrice: number;
    packages: Package[];
    mostEffective: Package;
}
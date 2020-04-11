const strategy = "jwt";

export const strategyValueProvider = {
    provide: 'PASSPORT_STRATEGY',
    useValue: strategy,
}
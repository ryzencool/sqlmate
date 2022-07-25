import create from 'zustand'

export const useFeatTab = create((set, get) => ({
    featTab: 0,
    setFeatTab: activeTab => {
        return set(state => ({featTab: activeTab}))
    }
}))

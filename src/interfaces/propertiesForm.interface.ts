export interface PropertiesFormStepProps {
    currentStep: number;
    setCurrentStep: (currentStep: number) => void;
    finalValues: any;
    setFinalValues: (finalValues: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    isEdit?: boolean;
}
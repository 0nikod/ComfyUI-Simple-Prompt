export {};

declare global {
    interface ComfySettingStore {
        getSettingValue<T>(key: string, defaultValue: T): T;
        setSettingValue<T>(key: string, value: T): void;
    }

    interface ComfyAppLike {
        ui?: {
            settings?: ComfySettingStore;
        };
        registerExtension?: (extension: ComfyExtensionLike) => void;
    }

    interface ComfyApiLike {
        apiURL?: string;
    }

    interface ComfyWidgetLike {
        name: string;
        value: string;
        callback?: (value: string) => void;
    }

    interface ComfyNodeLike {
        id: number;
        type: string;
        comfyClass?: string;
        widgets: ComfyWidgetLike[];
        addWidget: (type: string, name: string, value: unknown, callback: () => void) => unknown;
    }

    interface ComfyExtensionLike {
        name: string;
        nodeCreated?: (node: ComfyNodeLike, app: ComfyAppLike) => void;
    }

    interface Window {
        app?: ComfyAppLike;
        api?: ComfyApiLike;
        mockNode?: ComfyNodeLike;
    }
}

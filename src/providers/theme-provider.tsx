'use client'
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#FF9500",
                        borderRadius: 2,
                    },
                    components: {
                        Button: {
                            controlHeight: 40,
                            boxShadow: "none",
                            colorPrimaryActive: "#A35F00",
                            controlOutline: "none",
                            colorBorder: "#A35F00",
                        },
                        Input: {
                            controlHeight: 42,
                            boxShadow: "none",
                            activeShadow: "none",
                        },
                        Select: {
                            controlHeight: 42,
                            boxShadow: "none",
                            controlOutline: "none",
                        },
                        InputNumber: {
                            controlHeight: 42,
                            boxShadow: "none",
                            activeShadow: "none",
                        },
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </div>
    )
}

export default ThemeProvider
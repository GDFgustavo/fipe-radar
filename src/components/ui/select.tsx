"use client"

import Select, { components, StylesConfig } from "react-select";

type BaseOption = {
    label: string;
    value: string;
};

type SelectCustomProps<Option> = {
    instanceId: string;
    value: Option | null;
    onChange: (option: Option | null) => void;
    options: Option[];
    placeholder?: string;
    isSearchable?: boolean;
    isDisabled?: boolean
};

const Input = (props: any) => (
    <components.Input {...props} maxLength={100} />
);

function SelectCustom<Option extends BaseOption>({
    instanceId,
    value,
    onChange,
    options,
    placeholder,
    isSearchable = true,
    isDisabled
}: SelectCustomProps<Option>) {
    const customStyles: StylesConfig<Option, false> = {
        control: (provided) => ({
            ...provided,
            width: "100%",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "4px 4px",
            cursor: "pointer",
            fontSize: "14px",
            "@media (max-width: 768px)": {
                fontSize: "16px",
            },
            fontWeight: 500,
            boxShadow: "none",
            transition: "all .2s ease",
            "&:hover": {
                boxShadow: "none",
                borderColor: "var(--foreground)",
            },
        }),

        singleValue: (provided) => ({
            ...provided,
            color: "var(--foreground)",
            fontSize: "14px",
            "@media (max-width: 768px)": {
                fontSize: "16px",
            },
        }),

        input: (provided) => ({
            ...provided,
            color: "var(--foreground)",
            fontSize: "14px",
            "@media (max-width: 768px)": {
                fontSize: "16px",
            },
        }),

        menu: (provided) => ({
            ...provided,
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            marginTop: "8px",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,.12)",
            overflow: "hidden",
            zIndex: 9999,
        }),

        option: (provided, state) => ({
            ...provided,
            padding: "12px 16px",
            fontSize: "14px",
            "@media (max-width: 768px)": {
                fontSize: "16px",
            },
            cursor: "pointer",
            backgroundColor: state.isSelected
                ? "var(--secondary)"
                : state.isFocused
                    ? "var(--secondary)"
                    : "transparent",
            color: "var(--foreground)",
            transition: 'all 0.2s ease',
            ':active': {
                backgroundColor: 'var(--secondary)'
            },
        }),

        placeholder: (provided) => ({
            ...provided,
            color: "var(--muted-foreground)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: "var(--muted-foreground)",
            padding: "4px",
            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform .2s ease",
            "&:hover": {
                color: "var(--muted-foreground)"
            }
        }),

        clearIndicator: (provided) => ({
            ...provided,
            color: "transparent",
        }),

        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
        }),

        multiValueLabel: (provided) => ({
            ...provided,
            color: "transparent",
        }),

        multiValueRemove: (provided) => ({
            ...provided,
            color: "#6b7280",
            ":hover": {
                backgroundColor: "#e5e7eb",
                color: "#111827",
            },
        }),
    };

    return (
        <Select<Option, false>
            components={{ Input }}
            instanceId={instanceId}
            value={value}
            onChange={(option) => onChange(option as Option | null)}
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            noOptionsMessage={() => "Nenhuma opção encontrada"}
            isDisabled={isDisabled}
            styles={customStyles}
        />
    )
}

export default SelectCustom

"use client"

import Select, { StylesConfig } from "react-select";

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
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "4px 4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "none",
            transition: "all .2s ease",
            "&:hover": {
                boxShadow: "none",
                borderColor: "#d1d5db",
            },
        }),

        singleValue: (provided) => ({
            ...provided,
            color: "#111827",
        }),

        input: (provided) => ({
            ...provided,
            color: "#111827",
        }),

        menu: (provided) => ({
            ...provided,
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
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
            cursor: "pointer",
            backgroundColor: state.isSelected
                ? "#e5e7eb"
                : state.isFocused
                    ? "#f3f4f6"
                    : "transparent",
            color: "#111827",
            transition: "all .15s ease",
        }),

        placeholder: (provided) => ({
            ...provided,
            color: "#9ca3af",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: "#9ca3af",
            padding: "4px",
            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform .2s ease",
        }),

        clearIndicator: (provided) => ({
            ...provided,
            color: "#9ca3af",
        }),

        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
        }),

        multiValueLabel: (provided) => ({
            ...provided,
            color: "#111827",
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

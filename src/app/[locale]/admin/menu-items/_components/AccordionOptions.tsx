import AccordionItem from "./AccordionItem";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { ItemOptionsKeys } from "../add/AddProductForm";
import { ExtraIngredients, ProductSizes } from "@prisma/client";
import { useTranslations } from "next-intl";

const sizesNames = [
  ProductSizes.SMALL,
  ProductSizes.MEDIUM,
  ProductSizes.LARGE,
];

const extrasNames = [
  ExtraIngredients.CHEESE,
  ExtraIngredients.BACON,
  ExtraIngredients.ONION,
  ExtraIngredients.PEPPER,
  ExtraIngredients.TOMATO,
];

const AccordionOptions = <T extends FieldValues>({
  control,
  name,
  fields,
  append,
  remove,
  optionKey,
}: {
  control: Control<T>;
  name: "sizes" | "extras";
  fields: { id: string; name?: string; price?: number }[];
  append: (item: { name: string; price: number }) => void;
  remove: (index: number) => void;
  optionKey: ItemOptionsKeys;
}) => {
  const t = useTranslations("admin.menu-items.addProduct.form");

  const getNames = (currentValue?: string) => {
    const allOptions =
      optionKey === ItemOptionsKeys.SIZES ? sizesNames : extrasNames;

    const usedOptions = fields.map((f) => f.name);
    return allOptions.filter(
      (opt) => !usedOptions.includes(opt) || opt === currentValue
    );
  };

  const isThereAvailableOptions = () => {
    const totalOptions =
      optionKey === ItemOptionsKeys.SIZES ? sizesNames : extrasNames;
    return totalOptions.length > fields.length;
  };

  return (
    <AccordionItem
      title={optionKey === ItemOptionsKeys.SIZES ? t("sizes") : t("extras")}
    >
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3 items-end">
            {/* Name Field */}
            <div className="flex-1">
              <label className="block mb-1 text-black">{t("optionName")}</label>
              <Controller
                control={control}
                name={`${name}.${index}.name` as Path<T>}
                render={({ field }) => (
                  <select
                    className="border p-2 rounded-md w-full"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <option value="" disabled>
                      {field.value ? field.value : "Select..."}
                    </option>
                    {getNames(field.value).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Price Field */}
            <div className="w-32">
              <label className="block mb-1 text-black">
                {t("optionPrice")}
              </label>
              <input
                type="number"
                min={0}
                {...control.register(`${name}.${index}.price` as Path<T>, {
                  valueAsNumber: true,
                })}
                className="border p-2 rounded-md w-full"
              />
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-700 text-xl pb-3"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}

        {/* Add New Option */}
        {isThereAvailableOptions() && (
          <button
            type="button"
            onClick={() => append({ name: "", price: 0 })}
            className="w-full border mt-2 border-gray-300 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors text-black font-semibold"
          >
            <FiPlus className="inline mr-2" />
            {optionKey === ItemOptionsKeys.SIZES ? t("addSize") : t("addExtra")}
          </button>
        )}
      </div>
    </AccordionItem>
  );
};

export default AccordionOptions;

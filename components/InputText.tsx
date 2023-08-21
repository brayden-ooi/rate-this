import { JSX } from "preact";

export default function InputText(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...props}
    />
  );
}

type InputTextWithLabelProps = {
  label: string;
} & JSX.HTMLAttributes<HTMLInputElement>;

export function InputTextWithLabel(
  { label, ...props }: InputTextWithLabelProps,
) {
  return (
    <div>
      <label for={props.id} class="block mb-2 text-sm font-medium">
        {label}
      </label>
      <InputText {...props} />
    </div>
  );
}

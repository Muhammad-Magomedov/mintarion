"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/Input/Input";
import { useCopilotStore } from "@/features/ask-copilot";
import styles from "./styles.module.scss";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  showList?: boolean;
  enableLink?: boolean;
  icon?: string | React.ReactNode
  placeholder: string
  value?: string;
  onValueChange?: (value: string) => void
}

export interface ISearchFormData {
  searchText: string;
}

export interface ISearchResult {
  label: string
  href?: string
}

export const SearchForm: React.FC<Props> = ({
  className = "",
  showList = false,
  enableLink = true,
  icon = <Search className="stroke-neutral-400" />,
  placeholder = "",
  value,
  onValueChange,
  ...props
}) => {
  const [formData, setFormData] = useState<ISearchFormData>({
    searchText: value ?? "",
  });
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  const { chat, updateValue } = useCopilotStore();

  useEffect(() => {
    onValueChange && onValueChange(formData.searchText);
  }, [formData.searchText])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateValue("chat", { ...chat, isOpen: true, userMessage: formData.searchText });
    setFormData((prev) => ({ ...prev, searchText: "" }));
  };

  const form = (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit} {...props}>
      <Input
        classNames={{ wrapper: styles.inputWrapper, content: "shadow-[0_0_20px_rgba(87,85,85,0.3)] dark:shadow-[0_0_15px_var(--color-gray-550)]" }}
        startContent={
          <button className={styles.btn} type="submit">
            {typeof icon === "string" ? <img src={icon} alt="" /> : icon}
          </button>
        }
        value={formData.searchText}
        onChange={(e) =>
          setFormData({ ...formData, searchText: e.target.value })
        }
        placeholder={placeholder}
      />
    </form>
  )

  return showList
    ? <div className={styles.content}>
      {form}
      <ul className={styles.list}>
        {searchResults.map(({ label, href }) => (  
          <li className={styles.listItem}>
            {enableLink ? <Link href={href ?? "/"}>{label}</Link> : label}
          </li>
        ))}
      </ul>
    </div>
    : form;
};

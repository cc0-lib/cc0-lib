"use client";
import { Pencil, Save, X } from "lucide-react";
import {
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

type Props = {
  initialValue: string;
  id: string;
  onEdit: (newValue: string, id: string, edited: boolean) => void;
  rows?: number;
  editable?: boolean;
};
const TextEdit = ({ initialValue, id, onEdit, rows, editable }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = useCallback(() => {
    if (value !== initialValue) {
      onEdit(value, id, true);
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  }, [value, id, onEdit]);

  const handleReset = useCallback(() => {
    setValue(initialValue);
    onEdit(initialValue, id, false);
    setIsEditing(false);
  }, [initialValue, id, onEdit]);

  useEffect(() => {
    if (!isEditing) {
      setValue(initialValue);
    }
  }, [isEditing, initialValue]);

  return (
    <div onDoubleClick={handleDoubleClick} className="w-full font-jetbrains">
      {isEditing && editable ? (
        <div className="flex flex-col gap-1 ">
          <span className="text-sm uppercase text-prim">{id}</span>

          <div className="flex w-full flex-row justify-between gap-2">
            <textarea
              // type="text"
              rows={rows ?? 1}
              value={value}
              autoFocus
              autoCorrect="off"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                } else if (e.key === "Escape") {
                  handleReset();
                }
              }}
              className="h-auto w-full border-b-2 bg-transparent text-left outline-none focus:border-prim"
            />
            <X
              onClick={() => {
                handleReset();
              }}
              className="h-6 w-6 self-center hover:stroke-prim"
            />
            {value !== initialValue && (
              <>
                <Save
                  onClick={handleSave}
                  className="h-6 w-6 self-center hover:stroke-prim"
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="group flex flex-col gap-1">
          <span className="text-sm uppercase text-zinc-300">{id}</span>
          <div className="flex flex-row gap-2">
            <span className="w-full max-w-max">{value}</span>
            {!isEditing && editable && (
              <Pencil
                onClick={() => {
                  setIsEditing(true);
                }}
                className="h-6 w-6 self-center stroke-zinc-600 opacity-0 hover:stroke-prim group-hover:opacity-100"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TextEdit;

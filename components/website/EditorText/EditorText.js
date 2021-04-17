import Cleave from "cleave.js/react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
const InputType = {
    get TEXT() {
      return "text";
    },
    get NUMBER() {
      return "number";
    },
    get PASSWORD() {
      return "password";
    },
  };
  
const EditorText = forwardRef(
    (
      {
        children,
        defaultValue,
        _value,
        height = 300,
        label,
        type = InputType.TEXT,
        placeholder,
        validateConditions = [],
        _id="text-editor",
        onChange,
        ...rest
      },
      ref
    ) => {
      const inputRef = useRef();
      const [error, setError] = useState();
      const [currentValue, setCurrentValue] = useState(_value);
  
      useEffect(()=>{
        setCurrentValue(_value);
      },[_value])
  
      const isValid = () => {
        let isValid;
        for (var i = 0; i < validateConditions.length; i++) {
          const condition = validateConditions[i];
          isValid = validate({
            value: currentValue,
            type: condition.type,
            minLength: condition.minLength,
            maxLength: condition.maxLength,
            errMessage: condition.errMessage,
          });
          if (typeof isValid != "boolean") {
            setError(isValid); // display error message...
            break;
          }
        }
        if (isValid == true) {
          setError(null);
          return true;
        } else {
          return false;
        }
      };
  
      useImperativeHandle(ref, () => ({
        get value() {
          return currentValue;
        },
        get isValid() {
          return isValid();
        },
      }));
  
      const errClass = error && error.length > 0 ? "error" : "";
      const onEditorChange = (content, editor) => {
        setCurrentValue(content);
        if (onChange) onChange(content);
      };
  
      return (
        <div className="form-group">
          <style jsx>{`
            label {
              display: inline-block;
            }
            .label {
              margin-bottom: 0.5rem;
            }
            label.error {
              display: block;
              color: red;
              font-size: 0.9rem;
              margin-top: 5px;
            }
            .hide {
              display: none;
            }
          `}</style>
          <label className={`label ${label ? "" : "hide"}`}>{label}</label>
          <Editor
            ref={inputRef}
            id={_id}
            initialValue={defaultValue}
            value={_value}
            // apiKey="tglg10xhq02cxgmaixdccuyfwkkvvem203eqoqlftdk2j48t"
            init={{
              height: height,
              menubar: false,
              entity_encoding: "raw",
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen image",
                "insertdatetime media table paste code help wordcount image",
              ],
              toolbar:
                "undo redo| bold italic underline forecolor backcolor | \
               alignleft aligncenter alignright alignjustify | formatselect | image",
              //  bullist numlist outdent indent | removeformat | help | formatselect |",
            }}
            onEditorChange={onEditorChange}
          />
          <label className="error">{error}</label>
        </div>
      );
    }
  );

  export default EditorText;
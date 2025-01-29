import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import { FileInput } from "./ui/file-input";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    multipleChoice: [],
    file: null,
    date: "",
    shortText: "",
    longText: "",
    dropdown: "",
    radioButtons: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    multipleChoice: "",
    file: "",
    date: "",
    shortText: "",
    longText: "",
    radioButtons: "",
  });
  const steps = 7;

  

  const nextStep = () => {
    // Validation for each step before proceeding to the next step
    if (step === 1 && formData.multipleChoice.length === 0) {
      setErrors({ ...errors, multipleChoice: "Please select at least one option" });
      return;
    }
    

    if (step === 2 && !formData.file) {
      setErrors({ ...errors, file: "File is required to proceed" });
      return;
    }

    if (step === 3 && (!formData.date || new Date(formData.date) < new Date())) {
      setErrors({ ...errors, date: "Please select a date from today or in the future" });
      return;
    }

    if (step === 4) {
      if (formData.shortText.length < 5 || formData.shortText.length > 100) {
        setErrors({ ...errors, shortText: "Short text must be between 5 and 100 characters" });
        return;
      }
      if (formData.longText.length < 10 || formData.longText.length > 500) {
        setErrors({ ...errors, longText: "Long text must be between 10 and 500 characters" });
        return;
      }
    }
    if (step === 5 && !formData.dropdown) {
      setErrors({ ...errors, dropdown: "Please select an option" });
      return;
    }

    if (step === 6 && !formData.radioButtons) {
      setErrors({ ...errors, radioButtons: "Please select a radio button" });
      return;
    }

    if (step < steps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Reset error for that field
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 1 * 1024 * 1024) {
      setErrors({ ...errors, file: "File size must be less than 1MB" });
      setFormData({ ...formData, file: null });
    } else {
      setFormData({ ...formData, file });
      setErrors({ ...errors, file: "" }); // Reset file error
    }
  };

  const handleDropdownChange = (value) => {
    setFormData({ ...formData, dropdown: value });
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-3xl p-6 rounded-lg shadow-lg bg-white border-2 border-gray-300">
        <Progress value={(step / steps) * 100} className="mb-6" />
        <CardContent>
         
        {step === 1 && (
  <div>
    <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
      Step 1: Multiple Choice 
    </h2>
    <div className="flex flex-col space-y-2">
      {["option1", "option2", "option3", "option4"].map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={option}
            checked={formData.multipleChoice.includes(option)}
            onChange={(e) => {
              if (e.target.checked) {
                setFormData((prev) => ({
                  ...prev,
                  multipleChoice: [...prev.multipleChoice, option],
                }));
              } else {
                setFormData((prev) => ({
                  ...prev,
                  multipleChoice: prev.multipleChoice.filter((item) => item !== option),
                }));
              }
            }}
            className="size-5 border-gray-400 checked:bg-blue-500 checked:border-blue-500"
          />
          <label htmlFor={option} className="text-gray-700 cursor-pointer">
            {option.replace("option", "Option ")}
          </label>
        </div>
      ))}
    </div>
    {errors.multipleChoice && errors.multipleChoice.length > 0 && <p className="text-red-500 text-sm">{errors.multipleChoice}</p>}
  </div>
)}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Step 2: File Upload</h2>
              <FileInput onChange={handleFileUpload} />
              {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Step 3: Date Picker</h2>
              <Calendar
                selected={formData.date}
                onSelect={(date) => setFormData({ ...formData, date })}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Step 4: Additional Inputs</h2>
              <div className="mb-6">
                <Input
                  name="shortText"
                  placeholder="Short Text"
                  value={formData.shortText}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.shortText && <p className="text-red-500 text-sm">{errors.shortText}</p>}
              </div>
              <div className="mb-6">
                <Textarea
                  name="longText"
                  placeholder="Long Text"
                  value={formData.longText}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.longText && <p className="text-red-500 text-sm">{errors.longText}</p>}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Step 5: Dropdown Menu</h2>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    {formData.dropdown || 'Select an option'}
                    <svg
                      className="-mr-1 size-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleDropdownChange('Account settings')}
                      >
                        Account settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleDropdownChange('Support')}
                      >
                        Support
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleDropdownChange('License')}
                      >
                        License
                      </a>
                      <form method="POST" action="#" role="none">
                        <button
                          type="submit"
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                        >
                          Sign out
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              {errors.dropdown && <p className="text-red-500 text-sm">{errors.dropdown}</p>}
            </div>
          )}

{step === 6 && (
  <div>
    <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Step 6: Radio Buttons</h2>
    <div className="flex flex-col space-y-2">
    <RadioGroup>
  <RadioGroupItem
    id="radio1"
    value="radio1"
    checked={formData.radioButtons === "radio1"}
    onChange={(e) => {
      setFormData((prev) => ({ ...prev, radioButtons: e.target.value }));
    }}
    className="flex items-center"
  >
    Radio Button 1
  </RadioGroupItem>
  <RadioGroupItem
    id="radio2"
    value="radio2"
    checked={formData.radioButtons === "radio2"}
    onChange={(e) => {
      setFormData((prev) => ({ ...prev, radioButtons: e.target.value }));
    }}
    className="flex items-center"
  >
    Radio Button 2
  </RadioGroupItem>
  <RadioGroupItem
    id="radio3"
    value="radio3"
    checked={formData.radioButtons === "radio3"}
    onChange={(e) => {
      setFormData((prev) => ({ ...prev, radioButtons: e.target.value }));
    }}
    className="flex items-center"
  >
    Radio Button 3
  </RadioGroupItem>
</RadioGroup>
    </div>
    {errors.radioButtons && <p className="text-red-500 text-sm">{errors.radioButtons}</p>}
  </div>
)}

          {step === 7 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-blue-600">Thank You for Your Submission!</h2>
              <p className="mt-4 text-lg text-gray-700">
                We appreciate your time and effort in filling out the form.
                You will receive a confirmation email soon.
              </p>
            </div>
          )}


          <div className="flex justify-between mt-6">
            {step !== 7 && (
              <Button
                onClick={prevStep}
                disabled={step === 1}
                className="w-full sm:w-auto bg-gray-300 text-white hover:bg-gray-400 disabled:bg-gray-200"
              >
                Back
              </Button>
            )}
            {step !== 7 && (
              <Button
                onClick={nextStep}
                disabled={step === steps}
                className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;




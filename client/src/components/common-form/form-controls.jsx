/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

function FormControls({ formControls = [], formData, setFormData }) {
  const [passwordVisibility, setPasswordVisibility] = useState({});

  function togglePasswordVisibility(name) {
    setPasswordVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function renderComponentByType(getControlItem) {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || '';

    switch (getControlItem.componentType) {
      case 'input':
        element = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {getControlItem.type === 'password' && (
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => togglePasswordVisibility(getControlItem.name)}
              >
                {passwordVisibility[getControlItem.name] ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
            <Input
              id={getControlItem.name}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              type={
                getControlItem.type === 'password' &&
                passwordVisibility[getControlItem.name]
                  ? 'text'
                  : getControlItem.type
              }
              value={currentControlItemValue}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className={`${getControlItem.icon ? 'pl-10' : ''} ${
                getControlItem.type === 'password' ? 'pr-10' : ''
              } bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
            />
            {getControlItem.icon && (
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                {getControlItem.icon}
              </div>
            )}
          </motion.div>
        );
        break;

      case 'select':
        element = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: value,
                })
              }
              value={currentControlItemValue}
            >
              <SelectTrigger className="w-full bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                <SelectValue placeholder={getControlItem.label} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                {getControlItem.options && getControlItem.options.length > 0
                  ? getControlItem.options.map((optionItem) => (
                      <SelectItem
                        key={optionItem.id}
                        value={optionItem.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {optionItem.label}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </Select>
          </motion.div>
        );
        break;

      case 'textarea':
        element = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Textarea
              id={getControlItem.name}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              value={currentControlItemValue}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </motion.div>
        );
        break;

      default:
        element = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              id={getControlItem.name}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              type={getControlItem.type}
              value={currentControlItemValue}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </motion.div>
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-6">
      {formControls.map((controlItem) => (
        <motion.div
          key={controlItem.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1 * formControls.indexOf(controlItem),
          }}
        >
          <Label
            htmlFor={controlItem.name}
            className="text-gray-700 font-medium mb-2"
          >
            {controlItem.label}
          </Label>
          {renderComponentByType(controlItem)}
        </motion.div>
      ))}
    </div>
  );
}

export default FormControls;

import React from 'react'

export default function Login({data, handleChange, handleSubmit, formData}) {

    
// مكون الإدخال المطور بتنسيق المشروع
const InputField = ({ label, icon, type = "text", placeholder, name, value, onChange, align = "right" }) => {
    return(
        <div className="group">
    <label className="block text-[11px] font-black uppercase tracking-widest text-[rgb(var(--primary-container))] mb-2 group-focus-within:text-[rgb(var(--primary-container))] transition-colors px-1">
      {label}
    </label>
    <div className="relative flex items-center border-b-2 border-[rgb(var(--outline-variant))/0.2] bg-[rgb(var(--surface-container-low))] px-4 py-3.5 group-focus-within:border-[rgb(var(--primary-container))] transition-all rounded-t-xl">
      <span className="material-symbols-outlined text-[rgb(var(--primary-container))] ml-3 text-xl group-focus-within:text-[rgb(var(--primary-container))] transition-colors">{icon}</span>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{ textAlign: align }}
        className="flex-1 w-full bg-transparent border-none focus:ring-0 text-lg font-bold text-[rgb(var(--on-surface))] placeholder:text-stone-300 outline-none" 
        placeholder={placeholder}
        required
      />
    </div>
  </div>
    )
}}

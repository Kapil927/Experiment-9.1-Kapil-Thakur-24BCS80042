import React from "react";

const ResultPreview = ({ beforeSize, afterSize }) => {
  return (
    <div className="flex justify-between mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
      <span>Before: <b>{beforeSize} KB</b></span>
      <span>After: <b>{afterSize} KB</b></span>
    </div>
  );
};

export default ResultPreview;

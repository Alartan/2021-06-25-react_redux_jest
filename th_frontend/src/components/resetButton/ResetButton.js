import React from 'react';

export function ResetButton() {
  const reset = () => {
    sessionStorage.removeItem('name');
    window.location.reload();
  }
  return (
    <button onClick={reset}>
      Reset
    </button>
  );
}
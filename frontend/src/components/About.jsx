import React from "react";
export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">Balanzo</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Balanzo is a modern expense tracking app designed to help users
          manage their finances effortlessly. It provides tools for recording
          daily transactions, visualizing spending habits, and maintaining a
          clear financial balance across different categories. Built with a
          clean interface and secure data handling, Balanzo aims to make
          personal budgeting both simple and insightful.
        </p>
      </div>
    </div>
  );
}
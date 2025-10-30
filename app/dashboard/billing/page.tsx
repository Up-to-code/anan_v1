'use client'

import React from 'react'

export default function BillingPage() {
  const invoices = [
    { id: 'INV-2025-001', date: '2025-09-30', amount: 79, status: 'Paid', url: '#' },
    { id: 'INV-2025-002', date: '2025-10-30', amount: 79, status: 'Paid', url: '#' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Section: Your plan */}
        <section className="bg-white rounded-lg border border-slate-200 p-6">
          <h1 className="text-xl font-semibold text-slate-900">Your plan</h1>
          <p className="text-slate-600 mt-1">Pro · $79 / month</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <div className="text-sm text-slate-600">Conversations</div>
              <div className="text-lg font-semibold text-slate-900">3,420 / 10,000</div>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <div className="text-sm text-slate-600">Team seats</div>
              <div className="text-lg font-semibold text-slate-900">7 / 10</div>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <div className="text-sm text-slate-600">Storage</div>
              <div className="text-lg font-semibold text-slate-900">6.2 GB / 20 GB</div>
            </div>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Change plan</button>
          </div>
        </section>

        {/* Section: Payment method */}
        <section className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Payment method</h2>
          <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-3 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900">Visa •••• 4242</div>
              <div className="text-sm text-slate-600">Expires 08/27</div>
            </div>
            <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Update</button>
          </div>
          <div className="mt-3">
            <button className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50">Add new card</button>
          </div>
        </section>

        {/* Section: Invoices */}
        <section className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Invoices</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-slate-600">
                <tr>
                  <th className="text-left font-medium py-2">Invoice</th>
                  <th className="text-left font-medium py-2">Date</th>
                  <th className="text-left font-medium py-2">Amount</th>
                  <th className="text-left font-medium py-2">Status</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-t border-slate-100">
                    <td className="py-2 text-slate-900">{inv.id}</td>
                    <td className="py-2 text-slate-700">{inv.date}</td>
                    <td className="py-2 font-medium text-slate-900">${inv.amount}.00</td>
                    <td className="py-2"><span className="text-green-700 bg-green-100 rounded-full px-2 py-0.5 text-xs">{inv.status}</span></td>
                    <td className="py-2"><a href={inv.url} className="text-blue-600 hover:text-blue-700">Download PDF</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

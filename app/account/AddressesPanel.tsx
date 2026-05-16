"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MapPin,
  Plus,
  Trash2,
  X,
  Phone,
  Building2,
  Pencil,
} from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import { deleteAddress as deleteAddressAction } from "@/app/Apis/address/actions/deleteAddress.action";
import { addAddress } from "@/app/Apis/address/actions/addAddress.action";
import { updateAddress } from "@/app/Apis/address/actions/updateAddress.action";
import {
  type AddressFormInterface,
  type AddressInterface,
  getAddresses,
} from "@/app/Apis/address/address.api";

const emptyForm: AddressFormInterface = {
  name: "",
  details: "",
  phone: "",
  city: "",
};

export default function AddressesPanel() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const addresses = data?.data || [];
  const [submitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<AddressFormInterface>(emptyForm);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const isEditing = Boolean(editingAddressId);

  const { mutate: addAddressMutation } = useMutation({
    mutationFn: addAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });

      setIsFormOpen(false);
      setForm(emptyForm);
      setErrorMessage("");
    },

    onError: () => {
      setErrorMessage("Failed to add address");
    },
  });

  const { mutate: deleteAddressMutation } = useMutation({
    mutationFn: deleteAddressAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });

  const { mutate: updateAddressMutation } = useMutation({
    mutationFn: ({
      addressId,
      address,
    }: {
      addressId: string;
      address: AddressFormInterface;
    }) => updateAddress(addressId, address),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });

      setIsFormOpen(false);
      setEditingAddressId(null);
      setForm(emptyForm);
      setErrorMessage("");
    },

    onError: () => {
      setErrorMessage("Failed to update address");
    },
  });

  const updateForm = (field: keyof AddressFormInterface, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const saveAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const address: AddressFormInterface = {
      name: form.name.trim(),
      details: form.details.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
    };

    if (!address.name || !address.details || !address.phone || !address.city) {
      setErrorMessage("Please fill in all address fields.");
      return;
    }

    if (isEditing && editingAddressId) {
      updateAddressMutation({
        addressId: editingAddressId,
        address,
      });

      return;
    }

    addAddressMutation(address);
  };

  const deleteAddress = async (addressId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    deleteAddressMutation(addressId);
  };

  const openAddForm = () => {
    setEditingAddressId(null);
    setForm(emptyForm);
    setErrorMessage("");
    setIsFormOpen(true);
  };

  const openEditForm = (address: AddressInterface) => {
    setEditingAddressId(address._id);
    setForm({
      name: address.name,
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
    setErrorMessage("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (submitting) return;

    setIsFormOpen(false);
    setEditingAddressId(null);
    setForm(emptyForm);
    setErrorMessage("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-[70] flex min-h-screen w-screen items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={closeForm}
          />

          <section className="relative w-full max-w-lg rounded-2xl bg-white p-5 md:p-7 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {isEditing ? "Edit Address" : "Add New Address"}
              </h3>

              <button
                type="button"
                onClick={closeForm}
                disabled={submitting}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Close add address modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveAddress} className="space-y-4">
              {errorMessage && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Address Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="e.g. Home, Office"
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 text-sm outline-none focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Full Address
                </label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={(e) => updateForm("details", e.target.value)}
                  placeholder="Street, building, apartment..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 px-5 py-3 text-sm outline-none focus:border-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full rounded-xl border border-gray-200 px-5 py-3 text-sm outline-none focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    placeholder="Cairo"
                    className="w-full rounded-xl border border-gray-200 px-5 py-3 text-sm outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? isEditing
                      ? "Updating..."
                      : "Adding..."
                    : isEditing
                      ? "Update"
                      : "Add Address"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {isLoading ? (
        <section className="bg-white border border-gray-200 rounded-2xl min-h-[300px] flex items-center justify-center p-8">
          <p className="text-gray-500">Loading addresses...</p>
        </section>
      ) : addresses.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm shadow-green-100/70 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <MapPin size={24} fill="currentColor" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {address.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {address.details}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Phone size={16} />
                        {address.phone}
                      </span>

                      <span className="flex items-center gap-2">
                        <Building2 size={16} />
                        {address.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(address)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600"
                    aria-label="Edit address"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteAddress(address._id)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete address" >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="bg-white border border-gray-200 rounded-2xl min-h-[440px] flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <MapPin size={42} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              No Addresses Yet
            </h3>

            <p className="mt-3 text-base text-gray-500 leading-relaxed">
              Add your first delivery address to make checkout faster and
              easier.
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition"
            >
              <Plus size={18} />
              Add Your First Address
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

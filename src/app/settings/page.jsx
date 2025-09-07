'use client';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/SupabaseConfig';
import { uploadBusinessLogo } from '../../services/api/apiBusiness';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from 'next/image';

const businessId = '123e4567-e89b-12d3-a456-426614174005';

const Settings = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [savingAlias, setSavingAlias] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [companyAlias, setCompanyAlias] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('logo_url, company_alias')
        .eq('id', businessId)
        .single();

      if (error) {
        console.error('Failed to fetch business settings:', error.message);
        return;
      }

      setLogoUrl(data.logo_url || '');
      setCompanyAlias(data.company_alias || '');
    };

    fetchBusiness();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const url = await uploadBusinessLogo(file, businessId);

    if (url) {
      setLogoUrl(url);
      const { error } = await supabase
        .from('businesses')
        .update({ logo_url: url })
        .eq('id', businessId);

      if (error) {
        console.error('Error updating logo:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Failed to update the logo in the database.',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: 'Your business logo has been uploaded.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'There was a problem uploading the logo.',
      });
    }

    setUploading(false);
  };


  const handleAliasSave = async () => {
    if (!companyAlias) return;

    setSavingAlias(true);
    const { error } = await supabase
      .from('businesses')
      .update({ company_alias: companyAlias })
      .eq('id', businessId);

    setSavingAlias(false);

    if (error) {
      console.error('Error saving alias:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Failed to save alias: ${error.message}`,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Company alias has been updated.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleCopyLink = () => {
    if (!companyAlias) return;
    const url = `${window.location.origin}/payment/${companyAlias}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Business Settings
          </h2>

          {/* Logo Upload */}
          <section className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Business Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            />
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className={`mt-2 w-full rounded-md py-2 px-4 font-semibold text-white
              ${uploading || !file ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {uploading ? 'Uploading...' : 'Upload Logo'}
            </button>
            {logoUrl && (
              <div className="mt-4 flex justify-center">
                <Image
                  src={logoUrl}
                  alt="Business Logo"
                  className="h-28 w-28 rounded-full border border-gray-300 object-cover"
                />
              </div>
            )}
          </section>

          {/* Alias */}
          <section className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Company Alias
            </label>
            <input
              type="text"
              value={companyAlias}
              onChange={(e) => setCompanyAlias(e.target.value)}
              placeholder="e.g. cake-studio"
              className="block w-full rounded-md border border-gray-300 px-3 py-2
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleAliasSave}
              disabled={savingAlias}
              className={`w-full rounded-md py-2 px-4 font-semibold text-white
              ${savingAlias ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {savingAlias ? 'Saving...' : 'Save Alias'}
            </button>
          </section>

          {/* Payment Link */}
          <section className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Payment Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={
                  companyAlias
                    ? `${window.location.origin}/payment/${companyAlias}`
                    : 'Set a company alias first'
                }
                className="flex-grow rounded-md border border-gray-300 px-3 py-2
                bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <button
                onClick={handleCopyLink}
                disabled={!companyAlias}
                className={`rounded-md px-4 py-2 font-semibold
                ${!companyAlias ? 'bg-gray-300 cursor-not-allowed' : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'}`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  );

};

export default Settings;

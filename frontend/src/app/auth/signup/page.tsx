"use client";

import { authSignup, createUserProfile } from "@/services/apiAuthentication";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password, firstname, lastname, gender } = formData;
    e.preventDefault();
    setLoading(true);
    console.log(email, password, firstname, lastname, gender);
    try {
      // Step 1: Register the user with Supabase Auth
      const { user } = await authSignup(email, password);
      if (!user) {
        console.log("error registering user");
        throw new Error("User registration failed");
      }
      console.log(user);

      // Step 2: Insert additional data into profiles table
      await createUserProfile(user.id, firstname, lastname, gender);

      console.log("User registered and profile created successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="mx-auto max-w-242.5 ">
      <Breadcrumb pageName="Sign Up" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Contact Form
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Subject
              </label>
              <input
                type="text"
                placeholder="Select subject"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <SelectGroupOne />

            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Message
              </label>
              <textarea
                rows={6}
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* <div className="border- rounded-sm border bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Trybae
              </h2>

              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="firstname"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <UserIcon className="size-6 text-inherit" />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="lastname"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <UserIcon className="size-6 text-inherit" />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Gender
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="gender"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <UserIcon className="size-6 text-inherit" />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <EnvelopeIcon className="size-6 text-inherit" />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <LockClosedIcon className="absolute right-4 top-4 size-6 text-inherit" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="repeat_password"
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <LockClosedIcon className="size-6 text-inherit" />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    name="signup"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Create account
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SignUp;

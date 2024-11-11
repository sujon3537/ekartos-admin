"use client";
import PermissionForm from "@/Components/Role/PermissionForm";
import FormWrapper from "@/Utils/HOC/FormWrapper";

const Role = () => {
  return (
    <FormWrapper title="AddRole">
      <PermissionForm />
    </FormWrapper>
  );
};

export default Role;

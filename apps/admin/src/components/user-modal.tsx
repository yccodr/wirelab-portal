"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { PlusCircle, Trash2, Upload, Download, CircleX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import { useRef, useState } from "react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/ui/tabs";
import { User, UserForm } from "@/domain/user";
import { useRouter } from "next/navigation";
import { createUser, updateUser } from "@/actions/user";

interface IProps {
  value?: User;
  isOpen: boolean;
  create?: boolean;
  onSubmit?: (data: UserForm) => void;
}

function UserModal(props: IProps) {
  const router = useRouter();
  const [newTag, setNewTag] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control, watch, setValue } =
    useForm<UserForm>({
      values: props.value,
    });

  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: vms,
    append: appendVm,
    remove: removeVm,
  } = useFieldArray({
    control,
    name: "vms",
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result as string;
        const isPublicKey = file.name.endsWith(".pub");
        if (isPublicKey) {
          setValue("sshPublicKey", content);
        } else {
          setValue("sshPrivateKey", content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadSSHKey = (isPublic: boolean): void => {
    const content = isPublic ? watch("sshPublicKey") : watch("sshPrivateKey");
    const filename = isPublic ? "vm-key.pub" : "vm-key";
    const blob = new Blob([content], { type: "text/text;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onSubmit = (user: UserForm) => {
    if (props.create) {
      createUser(user);
    }

    if (!props.value) return;
    updateUser(props.value.id, user);
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={(open) => !open && router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="vms">VMs</TabsTrigger>
              <TabsTrigger value="vpn">VPN</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <div className="col-span-3">
                  <Input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3">
                  {tags.map((item, index) => (
                    <Controller
                      key={item.id}
                      name={`tags.${index}`}
                      control={control}
                      render={({ field }) => (
                        <Badge className="mr-1 mb-1">
                          {field.value}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 text-red-500"
                            onClick={() => removeTag(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                    />
                  ))}
                  <div className="flex mt-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add new tag"
                      className="mr-2"
                    />
                    <Button
                      onClick={() => {
                        appendTag(newTag);
                        setNewTag("");
                      }}
                      size="sm"
                      type="button"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vms">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vm-name" className="text-right">
                  VM Name
                </Label>
                <div className="col-span-3">
                  <Input id="vm-name" {...register("vm.name")} />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vm-username" className="text-right">
                  VM Username
                </Label>
                <div className="col-span-3">
                  <Input id="vm-username" {...register("vm.user")} />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vm-ip" className="text-right">
                  VM IP (IPv4/CIDR)
                </Label>
                <div className="col-span-3">
                  <Input id="vm-ip" {...register("vm.ip")} />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sshKey" className="text-right">
                  SSH Key
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      size="sm"
                    >
                      <Upload className="h-4 w-4 mr-1" /> Upload Key
                    </Button>
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => handleDownloadSSHKey(true)}
                      size="sm"
                      disabled={!watch("sshPublicKey")}
                    >
                      <Download className="h-4 w-4 mr-1" /> Public Key
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleDownloadSSHKey(false)}
                      size="sm"
                      disabled={!watch("sshPrivateKey")}
                    >
                      <Download className="h-4 w-4 mr-1" /> Private Key
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {watch("sshPublicKey")
                      ? "Public key uploaded"
                      : "No public key"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {watch("sshPrivateKey")
                      ? "Private key uploaded"
                      : "No private key"}
                  </div>
                </div>
              </div>

              {vms.map((vm, index) => (
                <div key={vm.id} className="flex flex-col gap-4">
                  <div className="flex items-center gap-1">
                    <Label className="font-bold text-lg">VM {index + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeVm(index)}
                    >
                      <CircleX className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vm-name" className="text-right">
                      VM Name
                    </Label>
                    <div className="col-span-3">
                      <Input id="vm-name" {...register(`vms.${index}.name`)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vm-username" className="text-right">
                      VM Username
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="vm-username"
                        {...register(`vms.${index}.user`)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vm-ip" className="text-right">
                      VM IP (IPv4/CIDR)
                    </Label>
                    <div className="col-span-3">
                      <Input id="vm-ip" {...register(`vms.${index}.ip`)} />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() =>
                  appendVm({
                    name: "",
                    user: "",
                    ip: "",
                  })
                }
                className="mt-4"
              >
                Add VM
              </Button>
            </TabsContent>

            <TabsContent value="vpn">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wireguardConfig" className="text-right">
                  WireGuard Config
                </Label>
                <Textarea
                  id="wireguardConfig"
                  {...register("wireguardConfig")}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UserModal;

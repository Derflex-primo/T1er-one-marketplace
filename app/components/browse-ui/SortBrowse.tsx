import { useProducts } from "@/hooks/useProducts";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Flex, Text, TextField, Button } from "@radix-ui/themes";

const SortBrowse = () => {
  const [browseType, setBrowseType] = useState<string | null>(null);
  const { products } = useProducts();
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger >
          <Button>Edit profile</Button>
        </Dialog.Trigger>

        <Dialog.Content className="absolute" style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Make changes to your profile.</Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                defaultValue="Freja Johnsen"
                placeholder="Enter your full name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                defaultValue="freja@example.com"
                placeholder="Enter your email"
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default SortBrowse;

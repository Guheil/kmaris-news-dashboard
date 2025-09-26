"use client";

import React from "react";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import {
  FormField,
  Select,
  RequiredIndicator,
  Label,
  FormGrid,
  ErrorMessage,
  TextArea,
  Input,
  SectionTitle,
} from "./elements";
import { ArticleFormBasicInfoProps } from "./interface";

export const ArticleFormBasicInfo: React.FC<ArticleFormBasicInfoProps> = ({
  formData,
  errors,
  categories,
  onInputChange,
}) => {
  return (
    <>
      <SectionTitle>Basic Information</SectionTitle>
      <FormGrid sx={{ mb: 4 }}>
        <FormField>
          <Label>
            Title <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Input
            placeholder="Enter article title..."
            value={formData.title}
            onChange={(e) => onInputChange("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            variant="outlined"
            fullWidth
          />
        </FormField>

        <FormField>
          <Label>
            Author <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Input
            placeholder="Author name..."
            value={formData.author}
            onChange={(e) => onInputChange("author", e.target.value)}
            error={!!errors.author}
            helperText={errors.author}
            variant="outlined"
            fullWidth
          />
        </FormField>

        <FormField>
          <Label>
            Category <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Select
            value={formData.category}
            onChange={(e) =>
              onInputChange("category", e.target.value as string)
            }
            error={!!errors.category}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">Select category...</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
          {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label>
            Status <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <Select
            value={formData.status}
            onChange={(e) => onInputChange("status", e.target.value as string)}
            fullWidth
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormField>

        <FormField fullWidth>
          <Label>
            Description <RequiredIndicator>*</RequiredIndicator>
          </Label>
          <TextArea
            placeholder="Enter article description..."
            value={formData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            minRows={4}
          />
          {errors.description && (
            <ErrorMessage>{errors.description}</ErrorMessage>
          )}
        </FormField>
      </FormGrid>
    </>
  );
};

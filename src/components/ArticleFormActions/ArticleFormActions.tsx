"use client";

import React from "react";
import { ArrowLeft, Eye, Save, Loader2 } from "lucide-react";
import { ActionsContainer, Button, ButtonGroup } from "./elements";
import { ArticleFormActionsProps } from "./interface";

export const ArticleFormActions: React.FC<ArticleFormActionsProps> = ({
  saving,
  onCancel,
  onPreview,
  onSaveDraft,
  onPublish,
  showPreview = false,
  showSaveDraft = false,
}) => {
  return (
    <ActionsContainer>
      <ButtonGroup>
        <Button customVariant="outline" onClick={onCancel} disabled={saving}>
          <ArrowLeft size={16} />
          Cancel
        </Button>
        
        {showPreview && (
          <Button customVariant="secondary" onClick={onPreview} disabled={saving}>
            <Eye size={16} />
            Preview
          </Button>
        )}
        
        {showSaveDraft && (
          <Button customVariant="secondary" onClick={onSaveDraft} disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Draft
          </Button>
        )}
        
        <Button customVariant="primary" onClick={onPublish} disabled={saving}>
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
          {saving ? "Saving..." : "Update Article"}
        </Button>
      </ButtonGroup>
    </ActionsContainer>
  );
};
'use client';

import { FC, useState, useRef } from 'react';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Settings, 
  Plus, 
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  ArrowLeft
} from 'lucide-react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Header } from '@/components/header/Header';
import { 
  CreateArticlePageProps, 
  ArticleFormData, 
  FormErrors 
} from './interface';
import {
  CreateArticleRoot,
  MainContent,
  SidebarOverlay,
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormSection,
  SectionTitle,
  FormGrid,
  FormField,
  Label,
  RequiredIndicator,
  Input,
  Select,
  Textarea,
  ErrorMessage,
  MediaUploadContainer,
  MediaUploadBox,
  MediaUploadIcon,
  MediaUploadText,
  MediaUploadSubtext,
  MediaPreview,
  MediaPreviewImage,
  MediaRemoveButton,
  ActionButtons,
  Button,
} from './elements';

export const CreateArticlePage: FC<CreateArticlePageProps> = ({ 
  sidebarOpen, 
  onSidebarToggle, 
  isMobile = false 
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    author: '',
    category: '',
    description: '',
    newsImage: '',
    newsVideo: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available categories from your sample data
  const categories = [
    'Technology',
    'Environment', 
    'Finance',
    'Science',
    'Sports',
    'Health'
  ];

  const handleInputChange = (
    field: keyof ArticleFormData, 
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          newsImage: e.target?.result as string,
          newsVideo: '' // Clear video if image is uploaded
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ 
        ...prev, 
        newsVideo: url,
        newsImage: '' // Clear image if video is uploaded
      }));
    }
  };

  const removeMedia = () => {
    setFormData(prev => ({ 
      ...prev, 
      newsImage: '', 
      newsVideo: '' 
    }));
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const articleData = {
        ...formData,
        status,
        id: Date.now().toString(), // Simple ID generation
        date: new Date().toISOString().split('T')[0],
        views: 0
      };

      // Here you would typically save to your backend
      console.log('Saving article:', articleData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to articles page or show success message
      alert(`Article ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
      
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  const goBack = () => {
    // Navigate back to articles page
    console.log('Navigate back to articles');
  };

  return (
    <CreateArticleRoot>
      {/* Mobile overlay */}
      <SidebarOverlay 
        show={isMobile && sidebarOpen} 
        onClick={handleOverlayClick}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={onSidebarToggle}
        navSections={[
          {
            title: "Overview",
            items: [
              { icon: <Home size={20} />, text: "Dashboard", href: "/news-dashboard" },
              { icon: <BarChart3 size={20} />, text: "Analytics", href: "/analytics" },
            ],
          },
          {
            title: "News Management",
            items: [
              { icon: <FileText size={20} />, text: "All Articles", href: "/news-dashboard/articles" },
              { icon: <Plus size={20} />, text: "Create Article", href: "/anews-dashborad/create-articles", active: true },
            ],
          }
        ]}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        collapsible={!isMobile}
        navItems={[]}
      />
      
      <Header
        title="Create Article"
        onMenuToggle={onSidebarToggle}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <FormContainer>
          {/* Form Header */}
          <FormHeader>
            <FormTitle>Create New Article</FormTitle>
            <FormSubtitle>
              Fill in the details below to create a new news article
            </FormSubtitle>
          </FormHeader>

          {/* Basic Information */}
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            <FormGrid>
              <FormField fullWidth>
                <Label>
                  Title <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter article title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  error={!!errors.title}
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </FormField>

              <FormField>
                <Label>
                  Author <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Input
                  type="text"
                  placeholder="Author name..."
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  error={!!errors.author}
                />
                {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}
              </FormField>

              <FormField>
                <Label>
                  Category <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  error={!!errors.category}
                >
                  <option value="">Select category...</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Select>
                {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
              </FormField>

              <FormField fullWidth>
                <Label>
                  Description <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Textarea
                  placeholder="Enter article description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  error={!!errors.description}
                />
                {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
              </FormField>
            </FormGrid>
          </FormSection>

          {/* Media Upload */}
          <FormSection>
            <SectionTitle>Media (Optional)</SectionTitle>
            <MediaUploadContainer>
              {/* Image Upload */}
              <div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <MediaUploadBox 
                  hasMedia={!!formData.newsImage}
                  onClick={() => !formData.newsVideo && imageInputRef.current?.click()}
                >
                  {formData.newsImage ? (
                    <MediaPreview>
                      <MediaPreviewImage src={formData.newsImage} alt="Preview" />
                      <MediaRemoveButton onClick={(e) => {
                        e.stopPropagation();
                        removeMedia();
                      }}>
                        <X size={12} />
                      </MediaRemoveButton>
                    </MediaPreview>
                  ) : (
                    <>
                      <MediaUploadIcon>
                        <ImageIcon size={20} />
                      </MediaUploadIcon>
                      <MediaUploadText>Upload Image</MediaUploadText>
                      <MediaUploadSubtext>PNG, JPG up to 5MB</MediaUploadSubtext>
                    </>
                  )}
                </MediaUploadBox>
              </div>

              {/* Video Upload */}
              <div>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={{ display: 'none' }}
                />
                <MediaUploadBox 
                  hasMedia={!!formData.newsVideo}
                  onClick={() => !formData.newsImage && videoInputRef.current?.click()}
                >
                  {formData.newsVideo ? (
                    <MediaPreview>
                      <div style={{ 
                        width: '100%', 
                        height: '100px', 
                        backgroundColor: '#f1f5f9',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748b'
                      }}>
                        <Video size={24} />
                      </div>
                      <MediaRemoveButton onClick={(e) => {
                        e.stopPropagation();
                        removeMedia();
                      }}>
                        <X size={12} />
                      </MediaRemoveButton>
                    </MediaPreview>
                  ) : (
                    <>
                      <MediaUploadIcon>
                        <Video size={20} />
                      </MediaUploadIcon>
                      <MediaUploadText>Upload Video</MediaUploadText>
                      <MediaUploadSubtext>MP4, AVI up to 50MB</MediaUploadSubtext>
                    </>
                  )}
                </MediaUploadBox>
              </div>
            </MediaUploadContainer>
          </FormSection>

          {/* Action Buttons */}
          <ActionButtons>
            <Button 
              variant="outline" 
              onClick={goBack}
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} />
              Cancel
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting}
            >
              <Save size={16} />
              Save Draft
            </Button>
            <Button 
              variant="primary" 
              onClick={() => handleSubmit('published')}
              disabled={isSubmitting}
            >
              <Eye size={16} />
              Publish Article
            </Button>
          </ActionButtons>
        </FormContainer>
      </MainContent>
    </CreateArticleRoot>
  );
};
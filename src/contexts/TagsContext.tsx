import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CustomTag {
  id: string;
  name: string;
  color: string;
  priority: number;
  rules: string[];
}

interface TagsContextType {
  customTags: CustomTag[];
  addCustomTag: (tag: CustomTag) => void;
  updateCustomTag: (id: string, tag: CustomTag) => void;
  deleteCustomTag: (id: string) => void;
  getTagByName: (name: string) => CustomTag | undefined;
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const useTags = () => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  return context;
};

interface TagsProviderProps {
  children: ReactNode;
}

export const TagsProvider: React.FC<TagsProviderProps> = ({ children }) => {
  const [customTags, setCustomTags] = useState<CustomTag[]>([]);

  // Load tags from localStorage on mount
  useEffect(() => {
    const savedTags = localStorage.getItem('fusion-custom-tags');
    if (savedTags) {
      try {
        setCustomTags(JSON.parse(savedTags));
      } catch (error) {
        console.error('Error loading tags from localStorage:', error);
        // Fallback to default tags if localStorage is corrupted
        setCustomTags([
          { id: '1', name: 'Urgent', color: '#FFCCCC', priority: 5, rules: ['contains:urgent', 'contains:asap'] },
          { id: '2', name: 'Client', color: '#CCE5FF', priority: 4, rules: ['contains:client', 'contains:customer'] },
          { id: '3', name: 'Follow-up', color: '#E5F2FF', priority: 3, rules: ['contains:follow', 'contains:reminder'] },
          { id: '4', name: 'Meeting', color: '#FFF2CC', priority: 3, rules: ['contains:meeting', 'contains:call'] },
          { id: '5', name: 'Project', color: '#E5CCFF', priority: 2, rules: ['contains:project', 'contains:task'] },
        ]);
      }
    } else {
      // Set default tags if none exist in localStorage
      setCustomTags([
        { id: '1', name: 'Urgent', color: '#FFCCCC', priority: 5, rules: ['contains:urgent', 'contains:asap'] },
        { id: '2', name: 'Client', color: '#CCE5FF', priority: 4, rules: ['contains:client', 'contains:customer'] },
        { id: '3', name: 'Follow-up', color: '#E5F2FF', priority: 3, rules: ['contains:follow', 'contains:reminder'] },
        { id: '4', name: 'Meeting', color: '#FFF2CC', priority: 3, rules: ['contains:meeting', 'contains:call'] },
        { id: '5', name: 'Project', color: '#E5CCFF', priority: 2, rules: ['contains:project', 'contains:task'] },
      ]);
    }
  }, []);

  // Save tags to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fusion-custom-tags', JSON.stringify(customTags));
  }, [customTags]);

  const addCustomTag = (tag: CustomTag) => {
    setCustomTags(prev => [...prev, tag]);
  };

  const updateCustomTag = (id: string, updatedTag: CustomTag) => {
    setCustomTags(prev => prev.map(tag => tag.id === id ? updatedTag : tag));
  };

  const deleteCustomTag = (id: string) => {
    setCustomTags(prev => prev.filter(tag => tag.id !== id));
  };

  const getTagByName = (name: string) => {
    return customTags.find(tag => tag.name.toLowerCase() === name.toLowerCase());
  };

  const value: TagsContextType = {
    customTags,
    addCustomTag,
    updateCustomTag,
    deleteCustomTag,
    getTagByName,
  };

  return (
    <TagsContext.Provider value={value}>
      {children}
    </TagsContext.Provider>
  );
};

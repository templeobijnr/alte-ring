import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Globe, Instagram, Twitter, Linkedin, MessageSquare, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import type { Database } from '../../lib/database.types';

type Link = Database['public']['Tables']['links']['Row'];

interface SortableLinkProps {
  link: Link;
  onUpdate: (id: string, field: 'platform' | 'label' | 'url', value: string) => void;
  onRemove: (id: string) => void;
}

const platforms = [
  { value: 'custom', label: 'Custom Link', icon: Globe },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
];

export const SortableLink: React.FC<SortableLinkProps> = ({ link, onUpdate, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const PlatformIcon = platforms.find(p => p.value === link.platform)?.icon || Globe;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
    >
      <button
        className="cursor-move text-gray-400 hover:text-gray-600"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={link.platform}
          onChange={(e) => onUpdate(link.id, 'platform', e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {platforms.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>

        <Input
          value={link.label}
          onChange={(e) => onUpdate(link.id, 'label', e.target.value)}
          placeholder="Link Label"
          className="md:col-span-1"
        />

        <Input
          value={link.url}
          onChange={(e) => onUpdate(link.id, 'url', e.target.value)}
          placeholder="https://"
          leftIcon={<PlatformIcon size={16} />}
          className="md:col-span-1"
        />
      </div>

      <button
        onClick={() => onRemove(link.id)}
        className="text-gray-400 hover:text-red-600"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};
import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types';

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1, isActive: 1 });
categorySchema.index({ sortOrder: 1 });

// Auto-generate slug from name
categorySchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Update parent's children array
categorySchema.post('save', async function() {
  if (this.parent) {
    await mongoose.model('Category').findByIdAndUpdate(
      this.parent,
      { $addToSet: { children: this._id } }
    );
  }
});

export default mongoose.model<ICategory>('Category', categorySchema);
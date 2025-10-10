export interface CollectionType {
  collection_id: string;
  collection_name?: string;
  collection_description?: string;
  image?: File | null;
  collection_image?: string;
  start_date?: string;
  end_date?: string;
  status?: boolean;
}
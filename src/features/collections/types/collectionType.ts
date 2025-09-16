export interface CollectionType {
  collection_id?: string;
  collection_name?: string;
  collection_description?: string;
  image?: File | string | null;
  start_date?: string;
  end_date?: string;
}
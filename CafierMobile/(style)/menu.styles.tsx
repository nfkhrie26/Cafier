import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E6DEC9' 
  },
  header: { 
    backgroundColor: '#422A1E', 
    paddingTop: 60, 
    paddingBottom: 20, 
    alignItems: 'center' 
  },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', // 🚨 INI DIA: Biar ikon & text input sejajar di tengah
    backgroundColor: '#F5EFE1', 
    margin: 20, 
    paddingHorizontal: 15, 
    borderRadius: 25, 
    height: 45, 
    borderWidth: 1, 
    borderColor: '#D4C4A8' 
  },
  
  searchInput: { 
    flex: 1, 
    marginLeft: 10, 
    color: '#000',
    fontSize: 14,
    height: '100%', // Biar area ketiknya menuhin tinggi container
    textAlignVertical: 'center', // Biar teksnya beneran di tengah (khusus Android)
  },

  contentContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    paddingHorizontal: 10 
  },

  sidebar: { 
    width: '30%', 
    marginRight: 10 
  },

  menuArea: { 
    flex: 1,
    paddingBottom: 100 
  },

  categoryCard: { 
    backgroundColor: '#F5EFE1', 
    borderRadius: 15, 
    paddingVertical: 12, 
    alignItems: 'center', 
    marginBottom: 12 
  },
  categoryImage: { width: 40, height: 40, resizeMode: 'contain' },
  categoryText: { fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
});
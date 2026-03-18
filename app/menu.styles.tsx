import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6DEC9' },
  header: { backgroundColor: '#422A1E', paddingTop: 60, paddingBottom: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', letterSpacing: 1 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5EFE1', marginHorizontal: 20, marginTop: 20, marginBottom: 20, paddingHorizontal: 15, borderRadius: 25, height: 45, borderWidth: 1, borderColor: '#D4C4A8' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: '#000' },
  contentContainer: { flex: 1, flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 100 },
  sidebar: { width: '30%', marginRight: 15 },
  categoryCard: { backgroundColor: '#F5EFE1', borderRadius: 15, paddingVertical: 15, paddingHorizontal: 5, alignItems: 'center', marginBottom: 15 },
  categoryImage: { width: 50, height: 50, resizeMode: 'contain', marginBottom: 8 },
  categoryText: { fontSize: 12, fontWeight: 'bold', color: '#000', textAlign: 'center' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#BCA791', paddingTop: 15, paddingBottom: 35, position: 'absolute', bottom: 0, width: '100%' },
});
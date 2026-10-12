import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView,StyleSheet, Text, TextInput, TouchableOpacity,View,} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Course = 'Starter' | 'Main Course' | 'Dessert';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

const COURSES: Course[] = ['Starter', 'Main Course', 'Dessert'];

export default function App() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addMenuItem = () => {
    Keyboard.dismiss();
    setError('');
    setSuccess('');

    const trimmedName = dishName.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();
    const numericPrice = Number(trimmedPrice);

    
    if (!trimmedName || !trimmedDescription || !course || !trimmedPrice) {
      setError('Please complete all fields before adding the dish.');
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError('Enter a valid price greater than R0.00.');
      return;
    }

     const newItem: MenuItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: trimmedName,
      description: trimmedDescription,
      course,
      price: numericPrice,
    };

    setMenuItems((currentItems) => [...currentItems, newItem]);
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setSuccess(`${trimmedName} was added to the menu successfully.`);
  };

   return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>RESTAURANT MANAGEMENT</Text>
            <Text style={styles.headerTitle}>Chef's Menu Manager</Text>
            <Text style={styles.headerSubtitle}>
              Add dishes and keep your restaurant menu organised.
            </Text>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {menuItems.length} {menuItems.length === 1 ? 'dish' : 'dishes'} on menu
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Add a menu item</Text>
            <Text style={styles.sectionSubtitle}>
              Enter the details of the dish below.
            </Text>

            {error !== '' && (
              <View accessibilityRole="alert" style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {success !== '' && (
              <View accessibilityRole="alert" style={styles.successBox}>
                <Text style={styles.successText}>{success}</Text>
              </View>
            )}

            <Text style={styles.label}>Dish name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Creamy mushroom soup"
              placeholderTextColor="#94A3B8"
              value={dishName}
              onChangeText={(value) => {
                setDishName(value);
                setError('');
                setSuccess('');
              }}
              maxLength={80}
              returnKeyType="next"
              accessibilityLabel="Dish name"
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Describe the ingredients or dish"
              placeholderTextColor="#94A3B8"
              value={description}
              onChangeText={(value) => {
                setDescription(value);
                setError('');
                setSuccess('');
              }}
              multiline
              textAlignVertical="top"
              maxLength={250}
              accessibilityLabel="Dish description"
            />

            <Text style={styles.label}>Course *</Text>
            <View style={styles.courseOptions}>
              {COURSES.map((item) => {
                const selected = course === item;
                return (
                  <TouchableOpacity
                    key={item}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    style={[
                      styles.courseButton,
                      selected && styles.courseButtonSelected,
                    ]}
                    onPress={() => {
                      setCourse(item);
                      setError('');
                      setSuccess('');
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.courseButtonText,
                        selected && styles.courseButtonTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Price (R) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 89.99"
              placeholderTextColor="#94A3B8"
              value={price}
              onChangeText={(value) => {
                setPrice(value);
                setError('');
                setSuccess('');
              }}
              keyboardType="decimal-pad"
              maxLength={10}
              accessibilityLabel="Dish price in rand"
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addMenuItem}
              activeOpacity={0.85}
              accessibilityRole="button"
            >
              <Text style={styles.addButtonText}>+ Add to menu</Text>
            </TouchableOpacity>
            <Text style={styles.requiredNote}>* Required fields</Text>
          </View>

          <View style={styles.menuHeading}>
            <View>
              <Text style={styles.sectionTitle}>Current menu</Text>
              <Text style={styles.sectionSubtitle}>
                All dishes added during this session.
              </Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{menuItems.length}</Text>
            </View>
          </View>

          {menuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🍽</Text>
              <Text style={styles.emptyTitle}>Your menu is empty</Text>
              <Text style={styles.emptyText}>
                Add your first dish using the form above. It will appear here.
              </Text>
            </View>
          ) : (
            menuItems.map((item, index) => (
              <View key={item.id} style={styles.menuItemCard}>
                <View style={styles.menuItemTop}>
                  <View style={styles.dishNumber}>
                    <Text style={styles.dishNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.dishHeading}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.courseTag}>{item.course}</Text>
                  </View>
                  <Text style={styles.dishPrice}>
                    R{item.price.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.dishDescription}>{item.description}</Text>
              </View>
            ))
          )}

          <Text style={styles.footer}>
            Chef's Menu Manager • Menu items are kept while this app session is open.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scrollContent: {
    paddingBottom: 28,
  },
  header: {
    backgroundColor: '#16352D',
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 26,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  eyebrow: {
    color: '#B7D9C6',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '800',
    lineHeight: 36,
  },
  headerSubtitle: {
    color: '#D8E7DF',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  headerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2D5145',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginTop: 17,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 19,
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
    marginBottom: 16,
  },
  label: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  multilineInput: {
    minHeight: 85,
  },
  courseOptions: {
    gap: 8,
  },
  courseButton: {
    minHeight: 43,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 13,
    backgroundColor: '#FFFFFF',
  },
  courseButtonSelected: {
    backgroundColor: '#E5F3EA',
    borderColor: '#26734D',
    borderWidth: 2,
  },
  courseButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  courseButtonTextSelected: {
    color: '#18583A',
    fontWeight: '800',
  },
  addButton: {
    minHeight: 51,
    backgroundColor: '#26734D',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  requiredNote: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 10,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 9,
    padding: 11,
    marginBottom: 8,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  successBox: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderWidth: 1,
    borderRadius: 9,
    padding: 11,
    marginBottom: 8,
  },
  successText: {
    color: '#166534',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  menuHeading: {
    marginHorizontal: 20,
    marginTop: 27,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countBadge: {
    minWidth: 40,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#DCECE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    color: '#18583A',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyCard: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIcon: {
    fontSize: 34,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
  },
  menuItemCard: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#E5F3EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  dishNumberText: {
    color: '#18583A',
    fontWeight: '800',
  },
  dishHeading: {
    flex: 1,
    paddingRight: 8,
  },
  dishName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  courseTag: {
    color: '#26734D',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  dishPrice: {
    color: '#18583A',
    fontSize: 15,
    fontWeight: '800',
  },
  dishDescription: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
    marginLeft: 42,
  },
  footer: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginHorizontal: 25,
    marginTop: 24,
  },
});


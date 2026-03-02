// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const App = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (number) => {
    // Xóa khoảng trắng, dấu -, chỉ giữ số
    const cleaned = number.replace(/\D/g, '');
    // Số VN: bắt đầu 09/03/05/07/08, đủ 10 số
    return cleaned.length === 10 && /^0(3|5|7|8|9)/.test(cleaned);
  };

  const handleContinue = () => {
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!validatePhone(phone)) {
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
      Alert.alert('Lỗi', 'Số điện thoại không đúng định dạng. Vui lòng nhập lại');
    } else {
      setError('');
      Alert.alert('Thành công', `Số điện thoại hợp lệ: ${cleanedPhone}`);
      // Ở đây bạn có thể gọi API hoặc chuyển sang màn hình OTP
    }
  };

  // Tự động format số: 0934544344 → 093 454 43 44
  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = '';
    if (cleaned.length > 0) formatted += cleaned.slice(0, 3);
    if (cleaned.length > 3) formatted += ' ' + cleaned.slice(3, 6);
    if (cleaned.length > 6) formatted += ' ' + cleaned.slice(6, 8);
    if (cleaned.length > 8) formatted += ' ' + cleaned.slice(8, 10);
    return formatted;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Đăng nhập</Text>

          <Text style={styles.label}>Nhập số điện thoại</Text>
          <Text style={styles.description}>
            Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản OneHousing Pro
          </Text>

          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Nhập số điện thoại của bạn"
            keyboardType="phone-pad"
            maxLength={17} // đủ chỗ cho 093 454 43 44
            value={phone}
            onChangeText={(text) => {
              setPhone(formatPhone(text));
              if (error) setError('');
            }}
            placeholderTextColor="#999"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // có thể đổi thành '#121212' cho dark mode
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    lineHeight: 24,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
    fontSize: 20,
    paddingVertical: 12,
    marginTop: 40,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
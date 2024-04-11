// Отримуємо дані з файлу JSON
function getData() {
    $data = file_get_contents('data.json');
    return json_decode($data, true);
}

// Записуємо дані в файл JSON
function saveData($data) {
    file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
}

// Отримуємо запит від клієнта
$request_body = file_get_contents('php://input');
$request_data = json_decode($request_body, true);

// Обробляємо запит
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $response_data = getData();
        break;
    case 'POST':
        // Додаємо нові дані
        $current_data = getData();
        $current_data[] = $request_data;
        saveData($current_data);
        $response_data = ['message' => 'Data added successfully'];
        break;
    case 'PATCH':
    // Оновлюємо існуючі дані
        $current_data = getData();
        $index = array_search($request_data['id'], array_column($current_data, 'id'));
        if ($index !== false) {
            $current_data[$index] = $request_data;
            saveData($current_data);
            $response_data = ['message' => 'Data updated successfully'];
        } else {
            $response_data = ['error' => 'Data with specified ID not found'];
        }
        break;
    case 'DELETE':
    // Видаляємо існуючі дані за ID
        $current_data = getData();
        $index = array_search($request_data['id'], array_column($current_data, 'id'));
        if ($index !== false) {
            unset($current_data[$index]);
            $current_data = array_values($current_data); // Переіндексуємо масив
            saveData($current_data);
            $response_data = ['message' => 'Data deleted successfully'];
        } else {
            $response_data = ['error' => 'Data with specified ID not found'];
        }
        break;
    case 'PUT':
    // Оновлюємо існуючі дані
        $current_data = getData();
        $index = array_search($request_data['id'], array_column($current_data, 'id'));
        if ($index !== false) {
            $current_data[$index] = $request_data;
            saveData($current_data);
            $response_data = ['message' => 'Data updated successfully'];
        } else {
            $response_data = ['error' => 'Data with specified ID not found'];
        }
        break;
    default:
        $response_data = ['error' => 'Unsupported HTTP method'];
        break;
}

// Відправляємо відповідь клієнту
header('Content-Type: application/json');
echo json_encode($response_data);
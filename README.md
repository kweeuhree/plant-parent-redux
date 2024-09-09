<h2>Plant Parent Application Overview</h2>

<table border="1" cellpadding="10" cellspacing="0">
  <thead>
    <tr>
      <th>Aspect</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Purpose</strong></td>
      <td>This app is designed to track plants, their family trees, and timelines. It supports CRUD operations for plants and manages the hierarchical relationships between them.</td>
    </tr>
    <tr>
      <td><strong>Key Features</strong></td>
      <td>
        <ul>
          <li><strong>Family Tree Structure:</strong> Plants are organized into family trees.</li>
          <li><strong>Plant Management:</strong> Users can create, update, delete, and track plants. Each plant record includes:
            <ul>
              <li><code>Plant ID:</code> Unique identifier for the plant.</li>
              <li><code>User ID:</code> Identifier for the user who owns the plant.</li>
              <li><code>Timeline ID:</code> Identifier for tracking events related to the plant over time.</li>
              <li><code>Family Tree ID:</code> Links the plant to its family tree.</li>
            </ul>
          </li>
          <li><strong>Timeline:</strong> Each plant has a timeline to track its growth.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Technology Stack</strong></td>
      <td>
        <ul>
          <li><strong>Frontend:</strong> Built using Vite, TypeScript, React, and Redux.</li>
          <li><strong>Backend:</strong> TBC will be developed in Go with a MySQL database.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Key Considerations</strong></td>
      <td>
        <ul>
          <li><strong>Data Normalization:</strong> I've opted to use separate IDs for different aspects of the plant (user, timeline, family tree). This approach helps keep data organized but requires careful management of relationships.</li>
          <li><strong>Performance:</strong> Storing and managing hierarchical data might involve recursive queries or complex joins, which could impact performance.</li>
          <li><strong>State Management:</strong> Redux is used for state management, with slices for handling user, plant and message states. Slices are created with <code>createAppSlice</code>.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Challenges</strong></td>
      <td>
        <ul>
          <li><strong>Complex Data Relationships:</strong> Managing and querying hierarchical data and maintaining relationships between plants and their family trees.</li>
          <li><strong>State Management:</strong> Ensuring that state management with Redux is efficiently handled, especially with complex relationships and potential performance implications.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Future Considerations</strong></td>
      <td>
        <ul>
          <li><strong>Performance Optimization:</strong> Considerations for optimizing database queries and state management, especially if the app scales.</li>
          <li><strong>User Experience:</strong> Enhancing how users interact with plants and family trees, ensuring that the UI reflects the hierarchical structure clearly.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

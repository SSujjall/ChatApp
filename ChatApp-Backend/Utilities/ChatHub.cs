using ChatApp_Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp_Backend.Utilities
{
    public class ChatHub : Hub
    {
        public async Task JoinRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            await Clients.Group(conn.ChatRoom).SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined {conn.ChatRoom}");
        }
    }
}
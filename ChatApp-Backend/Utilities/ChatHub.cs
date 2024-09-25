using ChatApp_Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp_Backend.Utilities
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined");
        }
    }
}